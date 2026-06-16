import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { MembershipRepository } from '../contracts/MembershipRepository';
import { AuthSessionRepository } from '../contracts/AuthSessionRepository';
import { AuthAuditRepository } from '../contracts/AuthAuditRepository';
import { SessionTokenService } from '../services/SessionTokenService';
import { PasswordHasher } from '../services/PasswordHasher';
import { SafeAuthUser, SafeAuthSession, Membership, AuthUser } from '../types';
import {
  AuthInvalidCredentialsError,
  AuthUserLockedError,
  AuthMembershipNotFoundError,
  AuthValidationError,
} from '../AuthErrors';

export interface LoginInput {
  email: string;
  password: string;
  companyId?: string;
}

export interface LoginOutput {
  user: SafeAuthUser;
  session: SafeAuthSession;
  rawSessionToken: string;
  membership: Membership;
}

export class LoginUseCase {
  constructor(
    private readonly userRepository: AuthUserRepository,
    private readonly membershipRepository: MembershipRepository,
    private readonly sessionRepository: AuthSessionRepository,
    private readonly auditRepository: AuthAuditRepository,
    private readonly tokenService: SessionTokenService,
    private readonly passwordHasher: PasswordHasher,
    private readonly maxFailedAttempts: number = 5,
    private readonly lockDurationMinutes: number = 15
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password, companyId } = input;

    if (!email || !email.trim()) {
      throw new AuthValidationError('E-mail é obrigatório.');
    }
    if (!password) {
      throw new AuthValidationError('Senha é obrigatória.');
    }

    const emailNormalized = email.trim().toLowerCase();

    // 1. Fetch User
    const user = await this.userRepository.findByEmail(emailNormalized);
    if (!user) {
      // Prevent user enumeration by throwing a generic error
      throw new AuthInvalidCredentialsError();
    }

    // 2. Check Lockout
    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      throw new AuthUserLockedError(`Usuário bloqueado devido a múltiplas tentativas malsucedidas de login.`);
    }

    // 3. Verify Password
    const passwordMatch = await this.passwordHasher.verifyPassword(password, user.passwordHash);

    if (!passwordMatch) {
      // Increment failed attempts
      const attempts = await this.userRepository.incrementFailedLogin(user.id);

      // Record Audit Log for login failure
      await this.auditRepository.recordAuthEvent({
        companyId: companyId || user.companyId || null,
        userId: user.id,
        eventType: 'login_failed',
        description: `Tentativa de login falhou para o e-mail: ${emailNormalized} (Tentativa ${attempts}/${this.maxFailedAttempts}).`,
        ipAddress: null,
        userAgent: null,
      });

      // Handle Lockout trigger
      if (attempts >= this.maxFailedAttempts) {
        const lockoutEnd = new Date(Date.now() + this.lockDurationMinutes * 60 * 1000);
        await this.userRepository.lockUserUntil(user.id, lockoutEnd);

        await this.auditRepository.recordAuthEvent({
          companyId: companyId || user.companyId || null,
          userId: user.id,
          eventType: 'user_locked',
          description: `Usuário (${emailNormalized}) bloqueado temporariamente por ${this.lockDurationMinutes} minutos por excesso de tentativas.`,
          ipAddress: null,
          userAgent: null,
        });

        throw new AuthUserLockedError(`Múltiplas tentativas de login incorretas. Conta bloqueada por ${this.lockDurationMinutes} minutos.`);
      }

      throw new AuthInvalidCredentialsError();
    }

    // Password is correct. Check and reset failed counts
    if (user.failedLoginAttempts > 0) {
      await this.userRepository.resetFailedLogin(user.id);
    }
    await this.userRepository.updateLastLogin(user.id, new Date());

    // 4. Resolve & Validate Membership
    let activeMembership: Membership | null = null;

    if (companyId) {
      const membership = await this.membershipRepository.findMembership(user.id, companyId);
      if (membership && membership.isActive) {
        activeMembership = membership;
      }
    } else {
      // Auto-resolve first active membership if companyId is not supplied
      const memberships = await this.membershipRepository.listMembershipsByUser(user.id);
      const activeOnes = memberships.filter((m) => m.isActive);
      if (activeOnes.length > 0) {
        activeMembership = activeOnes[0];
      }
    }

    if (!activeMembership) {
      await this.auditRepository.recordAuthEvent({
        companyId: companyId || null,
        userId: user.id,
        eventType: 'login_failed',
        description: `Login falhou: Nenhuma associação do usuário à empresa foi encontrada ou está ativa.`,
        ipAddress: null,
        userAgent: null,
      });
      throw new AuthMembershipNotFoundError();
    }

    // 5. Generate Secure Session Token
    const generatedToken = this.tokenService.generateSessionToken();

    // 6. Save Session (save ONLY the tokenHash)
    const session = await this.sessionRepository.createSession({
      userId: user.id,
      sessionTokenHash: generatedToken.tokenHash,
      expiresAt: generatedToken.expiresAt,
    });

    // 7. Audit success
    await this.auditRepository.recordAuthEvent({
      companyId: activeMembership.companyId,
      userId: user.id,
      eventType: 'login_success',
      description: `Usuário ${emailNormalized} logou com êxito na empresa ID ${activeMembership.companyId}.`,
      ipAddress: null,
      userAgent: null,
    });

    const safeUser: SafeAuthUser = {
      id: user.id,
      email: user.email,
      companyId: activeMembership.companyId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    };

    const safeSession: SafeAuthSession = {
      id: session.id,
      userId: session.userId,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      lastTouchedAt: session.lastTouchedAt,
    };

    return {
      user: safeUser,
      session: safeSession,
      rawSessionToken: generatedToken.rawToken,
      membership: activeMembership,
    };
  }
}

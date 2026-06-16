import { AuthSessionRepository } from '../contracts/AuthSessionRepository';
import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { MembershipRepository } from '../contracts/MembershipRepository';
import { AuthAuditRepository } from '../contracts/AuthAuditRepository';
import { SessionTokenService } from '../services/SessionTokenService';
import { AuthenticatedSession } from '../types';
import { getPermissionsForRole } from '../../../security/permissions/permissions';

export interface ValidateSessionInput {
  rawSessionToken: string;
}

export interface ValidateSessionOutput {
  authenticated: boolean;
  session?: AuthenticatedSession;
}

export class ValidateSessionUseCase {
  constructor(
    private readonly sessionRepository: AuthSessionRepository,
    private readonly userRepository: AuthUserRepository,
    private readonly membershipRepository: MembershipRepository,
    private readonly auditRepository: AuthAuditRepository,
    private readonly tokenService: SessionTokenService
  ) {}

  async execute(input: ValidateSessionInput): Promise<ValidateSessionOutput> {
    const { rawSessionToken } = input;

    if (!rawSessionToken) {
      return { authenticated: false };
    }

    // 1. Calculate token hash
    let tokenHash: string;
    try {
      tokenHash = this.tokenService.hashSessionToken(rawSessionToken);
    } catch {
      return { authenticated: false };
    }

    // 2. Fetch Session by hash
    const session = await this.sessionRepository.findByTokenHash(tokenHash);
    if (!session) {
      return { authenticated: false };
    }

    // 3. Check if session has been revoked
    if (session.revokedAt) {
      return { authenticated: false };
    }

    // 4. Check if session has expired
    if (session.expiresAt.getTime() < Date.now()) {
      // Record audit event
      await this.auditRepository.recordAuthEvent({
        companyId: null,
        userId: session.userId,
        eventType: 'session_expired',
        description: `Sessão ID ${session.id} inválida por expiração temporária automática (Expires at: ${session.expiresAt.toISOString()}).`,
        ipAddress: null,
        userAgent: null,
      });

      return { authenticated: false };
    }

    // 5. Fetch User
    const user = await this.userRepository.findById(session.userId);
    if (!user) {
      return { authenticated: false };
    }

    // 6. Fetch active User Membership to determine actual Role and CompanyId status
    const memberships = await this.membershipRepository.listMembershipsByUser(user.id);
    const activeMembership = memberships.find((m) => m.isActive);

    if (!activeMembership) {
      return { authenticated: false };
    }

    // 7. Touch/update activity time
    await this.sessionRepository.touchSession(session.id);

    // 8. Map to AuthenticatedSession securely
    const authenticatedSession: AuthenticatedSession = {
      userId: user.id,
      email: user.email,
      companyId: activeMembership.companyId,
      role: activeMembership.role,
      permissions: getPermissionsForRole(activeMembership.role),
    };

    return {
      authenticated: true,
      session: authenticatedSession,
    };
  }
}

import { CompanyRepository } from '../../repositories/CompanyRepository';
import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { MembershipRepository } from '../contracts/MembershipRepository';
import { AuthAuditRepository } from '../contracts/AuthAuditRepository';
import { PasswordHasher } from '../services/PasswordHasher';
import { assertPasswordPolicy } from '../services/PasswordPolicy';
import { SafeAuthUser } from '../types';
import { AuthValidationError } from '../AuthErrors';
import { Company } from '../../../domain/entities';

export interface RegisterCompanyInput {
  companyName: string;
  adminFullName: string;
  adminEmail: string;
  adminPassword: string;
}

export interface RegisterCompanyOutput {
  companyId: string;
  user: SafeAuthUser;
  membershipId: string;
  role: 'owner';
}

export class RegisterCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: AuthUserRepository,
    private readonly membershipRepository: MembershipRepository,
    private readonly auditRepository: AuthAuditRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(input: RegisterCompanyInput): Promise<RegisterCompanyOutput> {
    const { companyName, adminFullName, adminEmail, adminPassword } = input;

    if (!companyName || !companyName.trim()) {
      throw new AuthValidationError('O nome da empresa é obrigatório.');
    }
    if (!adminEmail || !adminEmail.trim()) {
      throw new AuthValidationError('O e-mail do administrador é obrigatório.');
    }
    if (!adminPassword) {
      throw new AuthValidationError('A senha é obrigatória.');
    }

    const emailNormalized = adminEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNormalized)) {
      throw new AuthValidationError('E-mail informado possui formato inválido.');
    }

    // Check duplicate email
    const existingUser = await this.userRepository.findByEmail(emailNormalized);
    if (existingUser) {
      throw new AuthValidationError('Este e-mail já está cadastrado.');
    }

    // Validate password policy
    assertPasswordPolicy(adminPassword);

    // Hash password
    const hashedPassword = await this.passwordHasher.hashPassword(adminPassword);

    // Create Company
    const companyId = `com_${Math.random().toString(36).substring(2, 9)}`;
    const company: Company = {
      id: companyId,
      name: companyName.trim(),
      status: 'ACTIVE',
      created_at: new Date(),
    };
    await this.companyRepository.create(company);

    // Create User
    const user = await this.userRepository.createUser({
      email: emailNormalized,
      passwordHash: hashedPassword,
      companyId, // historical field
    });

    // Create membership
    const membership = await this.membershipRepository.createMembership({
      userId: user.id,
      companyId: company.id,
      role: 'owner',
    });

    // Record audit event
    await this.auditRepository.recordAuthEvent({
      companyId: company.id,
      userId: user.id,
      eventType: 'company_registered',
      description: `Empresa "${company.name}" registrada com sucesso. Administrador: ${adminFullName} (${emailNormalized}).`,
      ipAddress: null,
      userAgent: null,
    });

    const safeUser: SafeAuthUser = {
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      failedLoginAttempts: user.failedLoginAttempts,
      lockedUntil: user.lockedUntil,
      lastLoginAt: user.lastLoginAt,
    };

    return {
      companyId: company.id,
      user: safeUser,
      membershipId: membership.id,
      role: 'owner',
    };
  }
}

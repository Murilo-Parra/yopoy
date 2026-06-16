import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterCompanyUseCase } from '../use-cases/RegisterCompanyUseCase';
import { InMemoryCompanyRepository } from '../testing/InMemoryCompanyRepository';
import { InMemoryAuthUserRepository } from '../testing/InMemoryAuthUserRepository';
import { InMemoryMembershipRepository } from '../testing/InMemoryMembershipRepository';
import { InMemoryAuthAuditRepository } from '../testing/InMemoryAuthAuditRepository';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/BcryptPasswordHasher';

describe('RegisterCompanyUseCase Unit Tests', () => {
  let companyRepo: InMemoryCompanyRepository;
  let userRepo: InMemoryAuthUserRepository;
  let membershipRepo: InMemoryMembershipRepository;
  let auditRepo: InMemoryAuthAuditRepository;
  let passwordHasher: BcryptPasswordHasher;
  let registerUseCase: RegisterCompanyUseCase;

  beforeEach(() => {
    companyRepo = new InMemoryCompanyRepository();
    userRepo = new InMemoryAuthUserRepository();
    membershipRepo = new InMemoryMembershipRepository();
    auditRepo = new InMemoryAuthAuditRepository();
    passwordHasher = new BcryptPasswordHasher(4); // Use cost 4 for fast verification

    registerUseCase = new RegisterCompanyUseCase(
      companyRepo,
      userRepo,
      membershipRepo,
      auditRepo,
      passwordHasher
    );
  });

  it('should successfully register a company with owner and record audit', async () => {
    const output = await registerUseCase.execute({
      companyName: 'YoPoy Test Ltda',
      adminFullName: 'Murilo Parra',
      adminEmail: 'murilo@yopoy.com.br',
      adminPassword: 'Comp1exKey_Check#',
    });

    expect(output.companyId).toBeDefined();
    expect(output.membershipId).toBeDefined();
    expect(output.role).toBe('owner');
    expect(output.user.email).toBe('murilo@yopoy.com.br');
    
    // Safety check: password hash must NEVER be returned in safe output
    expect((output.user as any).passwordHash).toBeUndefined();

    // Verify entities are created in database
    const company = await companyRepo.findById(output.companyId);
    expect(company).not.toBeNull();
    expect(company?.name).toBe('YoPoy Test Ltda');

    const user = await userRepo.findById(output.user.id);
    expect(user).not.toBeNull();
    expect(user?.email).toBe('murilo@yopoy.com.br');
    expect(user?.passwordHash).not.toBe('Comp1exKey_Check#'); // Hashed

    const membership = await membershipRepo.findMembership(output.user.id, output.companyId);
    expect(membership).not.toBeNull();
    expect(membership?.role).toBe('owner');

    // Audit trace
    const auditLogs = await auditRepo.listAuthEventsByCompany(output.companyId);
    expect(auditLogs.length).toBe(1);
    expect(auditLogs[0].eventType).toBe('company_registered');
    expect(auditLogs[0].description).toContain('YoPoy Test Ltda');
  });

  it('should reject weak passwords and prevent recording anything', async () => {
    await expect(
      registerUseCase.execute({
        companyName: 'Fail Ltd',
        adminFullName: 'No Pass',
        adminEmail: 'admin@fail.com',
        adminPassword: 'weak',
      })
    ).rejects.toThrow('Password policy violated');

    expect(companyRepo.companies.length).toBe(0);
    expect(userRepo.users.length).toBe(0);
  });

  it('should reject registration if email is already taken', async () => {
    // Seed existing
    await userRepo.createUser({
      email: 'duplicate@domain.com',
      passwordHash: 'some_hash',
      companyId: 'com_old',
    });

    await expect(
      registerUseCase.execute({
        companyName: 'Duplicate Inc',
        adminFullName: 'John Doe',
        adminEmail: 'duplicate@domain.com',
        adminPassword: 'Comp1exKey_Check#',
      })
    ).rejects.toThrow('Este e-mail já está cadastrado');
  });
});

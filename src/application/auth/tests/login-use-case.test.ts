import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from '../use-cases/LoginUseCase';
import { InMemoryAuthUserRepository } from '../testing/InMemoryAuthUserRepository';
import { InMemoryMembershipRepository } from '../testing/InMemoryMembershipRepository';
import { InMemoryAuthSessionRepository } from '../testing/InMemoryAuthSessionRepository';
import { InMemoryAuthAuditRepository } from '../testing/InMemoryAuthAuditRepository';
import { NodeCryptoSessionTokenService } from '../../../infrastructure/auth/NodeCryptoSessionTokenService';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/BcryptPasswordHasher';

describe('LoginUseCase Unit Tests', () => {
  let userRepo: InMemoryAuthUserRepository;
  let membershipRepo: InMemoryMembershipRepository;
  let sessionRepo: InMemoryAuthSessionRepository;
  let auditRepo: InMemoryAuthAuditRepository;
  let tokenService: NodeCryptoSessionTokenService;
  let passwordHasher: BcryptPasswordHasher;
  let loginUseCase: LoginUseCase;

  const validPassword = 'Comp1exKey_Check#';
  const wrongPassword = 'WrongComp1exKey_999#';

  beforeEach(() => {
    userRepo = new InMemoryAuthUserRepository();
    membershipRepo = new InMemoryMembershipRepository();
    sessionRepo = new InMemoryAuthSessionRepository();
    auditRepo = new InMemoryAuthAuditRepository();
    tokenService = new NodeCryptoSessionTokenService();
    passwordHasher = new BcryptPasswordHasher(4); // fast hashing for testing

    loginUseCase = new LoginUseCase(
      userRepo,
      membershipRepo,
      sessionRepo,
      auditRepo,
      tokenService,
      passwordHasher,
      5, // max 5 attempts
      15 // 15 mins block
    );
  });

  it('successful login should return safe structures and single raw session token', async () => {
    // Seed user
    const passwordHash = await passwordHasher.hashPassword(validPassword);
    const user = await userRepo.createUser({
      email: 'user@yopoy.com',
      passwordHash,
      companyId: 'com_yopoy',
    });

    // Seed active membership
    const membership = await membershipRepo.createMembership({
      userId: user.id,
      companyId: 'com_yopoy',
      role: 'admin',
    });

    const output = await loginUseCase.execute({
      email: 'user@yopoy.com',
      password: validPassword,
      companyId: 'com_yopoy',
    });

    expect(output.user).toBeDefined();
    expect(output.user.email).toBe('user@yopoy.com');
    expect((output.user as any).passwordHash).toBeUndefined();

    expect(output.rawSessionToken).toBeDefined();
    expect(output.rawSessionToken.length).toBeGreaterThan(20);

    expect(output.session).toBeDefined();
    expect((output.session as any).sessionTokenHash).toBeUndefined();

    expect(output.membership.id).toBe(membership.id);

    // Assert only sessionTokenHash was persisted physically
    const savedSessions = sessionRepo.sessions;
    expect(savedSessions.length).toBe(1);
    expect(savedSessions[0].sessionTokenHash).toBe(tokenService.hashSessionToken(output.rawSessionToken));
    expect(savedSessions[0].sessionTokenHash).not.toContain(output.rawSessionToken);

    // Verify audit logs
    const audits = await auditRepo.listAuthEventsByCompany('com_yopoy');
    expect(audits.some((a) => a.eventType === 'login_success')).toBe(true);
  });

  it('wrong password should return generic credentials error and audit', async () => {
    const passwordHash = await passwordHasher.hashPassword(validPassword);
    const user = await userRepo.createUser({
      email: 'user@yopoy.com',
      passwordHash,
      companyId: 'com_yopoy',
    });

    await expect(
      loginUseCase.execute({
        email: 'user@yopoy.com',
        password: wrongPassword,
        companyId: 'com_yopoy',
      })
    ).rejects.toThrow('Credenciais inválidas');

    // Audit trace
    const audits = await auditRepo.listAuthEventsByCompany('com_yopoy');
    expect(audits.some((a) => a.eventType === 'login_failed')).toBe(true);
  });

  it('repeated failures must increment failed-login counter and lock user after 5 attempts', async () => {
    const passwordHash = await passwordHasher.hashPassword(validPassword);
    const user = await userRepo.createUser({
      email: 'fragile@yopoy.com',
      passwordHash,
      companyId: 'com_yopoy',
    });

    await membershipRepo.createMembership({
      userId: user.id,
      companyId: 'com_yopoy',
      role: 'employee',
    });

    // 4 failed attempts
    for (let i = 0; i < 4; i++) {
      await expect(
        loginUseCase.execute({ email: 'fragile@yopoy.com', password: wrongPassword, companyId: 'com_yopoy' })
      ).rejects.toThrow('Credenciais inválidas');
    }

    const updatedUser = await userRepo.findById(user.id);
    expect(updatedUser?.failedLoginAttempts).toBe(4);
    expect(updatedUser?.lockedUntil).toBeNull();

    // 5th failed attempt causes lockout
    await expect(
      loginUseCase.execute({ email: 'fragile@yopoy.com', password: wrongPassword, companyId: 'com_yopoy' })
    ).rejects.toThrow('Múltiplas tentativas de login incorretas');

    const lockedUser = await userRepo.findById(user.id);
    expect(lockedUser?.lockedUntil).not.toBeNull();
    expect(lockedUser!.lockedUntil!.getTime()).toBeGreaterThan(Date.now());

    // Subsequent login fails immediately due to lockout
    await expect(
      loginUseCase.execute({ email: 'fragile@yopoy.com', password: validPassword, companyId: 'com_yopoy' })
    ).rejects.toThrow('bloqueado devido a múltiplas tentativas');
  });

  it('non-existent membership should refuse login even with valid credentials', async () => {
    const passwordHash = await passwordHasher.hashPassword(validPassword);
    await userRepo.createUser({
      email: 'lonely@yopoy.com',
      passwordHash,
      companyId: 'com_unlinked',
    });

    await expect(
      loginUseCase.execute({
        email: 'lonely@yopoy.com',
        password: validPassword,
        companyId: 'com_unlinked',
      })
    ).rejects.toThrow('Vínculo do usuário com a empresa não localizado.');
  });
});

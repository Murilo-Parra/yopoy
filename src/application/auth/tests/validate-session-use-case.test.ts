import { describe, it, expect, beforeEach } from 'vitest';
import { ValidateSessionUseCase } from '../use-cases/ValidateSessionUseCase';
import { InMemoryAuthSessionRepository } from '../testing/InMemoryAuthSessionRepository';
import { InMemoryAuthUserRepository } from '../testing/InMemoryAuthUserRepository';
import { InMemoryMembershipRepository } from '../testing/InMemoryMembershipRepository';
import { InMemoryAuthAuditRepository } from '../testing/InMemoryAuthAuditRepository';
import { NodeCryptoSessionTokenService } from '../../../infrastructure/auth/NodeCryptoSessionTokenService';

describe('ValidateSessionUseCase Unit Tests', () => {
  let sessionRepo: InMemoryAuthSessionRepository;
  let userRepo: InMemoryAuthUserRepository;
  let membershipRepo: InMemoryMembershipRepository;
  let auditRepo: InMemoryAuthAuditRepository;
  let tokenService: NodeCryptoSessionTokenService;
  let validateUseCase: ValidateSessionUseCase;

  beforeEach(() => {
    sessionRepo = new InMemoryAuthSessionRepository();
    userRepo = new InMemoryAuthUserRepository();
    membershipRepo = new InMemoryMembershipRepository();
    auditRepo = new InMemoryAuthAuditRepository();
    tokenService = new NodeCryptoSessionTokenService();

    validateUseCase = new ValidateSessionUseCase(
      sessionRepo,
      userRepo,
      membershipRepo,
      auditRepo,
      tokenService
    );
  });

  it('valid token should authenticate successfully, update seen at, and return permissions', async () => {
    // 1. Seed user
    const user = await userRepo.createUser({
      email: 'employee@yopoy.com',
      passwordHash: 'dummy_hash',
      companyId: 'com_valid',
    });

    // 2. Seed active membership with role "employee"
    await membershipRepo.createMembership({
      userId: user.id,
      companyId: 'com_valid',
      role: 'employee',
    });

    // 3. Generate raw token details
    const tokenResult = tokenService.generateSessionToken();

    // 4. Create session inside database
    const session = await sessionRepo.createSession({
      userId: user.id,
      sessionTokenHash: tokenResult.tokenHash,
      expiresAt: tokenResult.expiresAt,
    });

    // Record initial time
    const initialTouch = session.lastTouchedAt.getTime();

    // 5. Execute validation with raw token
    const output = await validateUseCase.execute({
      rawSessionToken: tokenResult.rawToken,
    });

    expect(output.authenticated).toBe(true);
    expect(output.session).toBeDefined();
    expect(output.session?.userId).toBe(user.id);
    expect(output.session?.email).toBe('employee@yopoy.com');
    expect(output.session?.companyId).toBe('com_valid');
    expect(output.session?.role).toBe('employee');
    // Verify permissions lists
    expect(output.session?.permissions).toContain('sales:read');
    expect(output.session?.permissions).not.toContain('audit:read'); // employee doesn't have audit read

    // Ensure touch is completed successfully
    const updatedSession = sessionRepo.sessions[0];
    expect(updatedSession.lastTouchedAt.getTime()).toBeGreaterThanOrEqual(initialTouch);
  });

  it('incorrect token should decline authentication', async () => {
    const output = await validateUseCase.execute({
      rawSessionToken: 'completely_made_up_or_random_token_val',
    });
    expect(output.authenticated).toBe(false);
    expect(output.session).toBeUndefined();
  });

  it('expired session should fail authentication and record audit', async () => {
    const user = await userRepo.createUser({
      email: 'expired@yopoy.com',
      passwordHash: 'dummy_hash',
      companyId: 'com_valid',
    });

    await membershipRepo.createMembership({
      userId: user.id,
      companyId: 'com_valid',
      role: 'support',
    });

    const tokenResult = tokenService.generateSessionToken();

    // Create session in past/expired time
    await sessionRepo.createSession({
      userId: user.id,
      sessionTokenHash: tokenResult.tokenHash,
      expiresAt: new Date(Date.now() - 5000), // expired 5 seconds ago
    });

    const output = await validateUseCase.execute({
      rawSessionToken: tokenResult.rawToken,
    });

    expect(output.authenticated).toBe(false);

    // Audit trace for expiration
    const expiredEvents = auditRepo.events.filter((e) => e.eventType === 'session_expired');
    expect(expiredEvents.length).toBe(1);
    expect(expiredEvents[0].userId).toBe(user.id);
  });

  it('revoked session should fail authentication', async () => {
    const user = await userRepo.createUser({
      email: 'revoked@yopoy.com',
      passwordHash: 'dummy',
      companyId: 'com_valid',
    });

    await membershipRepo.createMembership({
      userId: user.id,
      companyId: 'com_valid',
      role: 'owner',
    });

    const tokenResult = tokenService.generateSessionToken();
    const session = await sessionRepo.createSession({
      userId: user.id,
      sessionTokenHash: tokenResult.tokenHash,
      expiresAt: tokenResult.expiresAt,
    });

    // Revoke
    await sessionRepo.revokeSession(session.id);

    const output = await validateUseCase.execute({
      rawSessionToken: tokenResult.rawToken,
    });

    expect(output.authenticated).toBe(false);
  });
});

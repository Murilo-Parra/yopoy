import { describe, it, expect, beforeEach } from 'vitest';
import { LogoutUseCase } from '../use-cases/LogoutUseCase';
import { InMemoryAuthSessionRepository } from '../testing/InMemoryAuthSessionRepository';
import { InMemoryAuthAuditRepository } from '../testing/InMemoryAuthAuditRepository';

describe('LogoutUseCase Unit Tests', () => {
  let sessionRepo: InMemoryAuthSessionRepository;
  let auditRepo: InMemoryAuthAuditRepository;
  let logoutUseCase: LogoutUseCase;

  beforeEach(() => {
    sessionRepo = new InMemoryAuthSessionRepository();
    auditRepo = new InMemoryAuthAuditRepository();
    logoutUseCase = new LogoutUseCase(sessionRepo, auditRepo);
  });

  it('logout should successfully revoke session and audit the action', async () => {
    // Seed persistent session
    const session = await sessionRepo.createSession({
      userId: 'usr_test_logout',
      sessionTokenHash: 'hash_123',
      expiresAt: new Date(Date.now() + 3600 * 1000),
    });

    expect(sessionRepo.sessions[0].revokedAt).toBeNull();

    await logoutUseCase.execute({
      sessionId: session.id,
      companyId: 'com_logout_corp',
      userId: 'usr_test_logout',
    });

    // Verification
    expect(sessionRepo.sessions[0].id).toBe(session.id);
    expect(sessionRepo.sessions[0].revokedAt).not.toBeNull();

    const auditLogs = await auditRepo.listAuthEventsByCompany('com_logout_corp');
    expect(auditLogs.length).toBe(1);
    expect(auditLogs[0].eventType).toBe('logout');
    expect(auditLogs[0].description).toContain(session.id);
  });

  it('logout should throw validation error if sessionId was omitted', async () => {
    await expect(
      logoutUseCase.execute({
        sessionId: '',
        companyId: 'com_logout_corp',
        userId: 'usr_test_logout',
      })
    ).rejects.toThrow('Session ID é obrigatório para logout.');
  });
});

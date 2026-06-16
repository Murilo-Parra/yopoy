import { describe, it, expect } from 'vitest';
import { toSafeAuthUser, toSafeAuthSession } from '../sanitizeAuthModels';
import { AuthUser, AuthSession } from '../types';

describe('Auth Sanitization & Safety Unit Tests', () => {
  it('toSafeAuthUser deve garantir que passwordHash foi removido', () => {
    const rawUser: AuthUser = {
      id: 'usr-123',
      email: 'user@yopoy.dev',
      passwordHash: '$2b$12$securehashvalue',
      companyId: 'company-777',
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const safe = toSafeAuthUser(rawUser);

    // TypeScript compilation allows checking runtime keys
    expect(safe).not.toHaveProperty('passwordHash');
    expect((safe as any).passwordHash).toBeUndefined();
    expect(safe.email).toBe('user@yopoy.dev');
  });

  it('toSafeAuthSession deve garantir que sessionTokenHash foi removido', () => {
    const rawSession: AuthSession = {
      id: 'sess-abc',
      userId: 'usr-123',
      sessionTokenHash: 'securetokenhashhash',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3600000),
      lastTouchedAt: new Date(),
      revokedAt: null,
    };

    const safe = toSafeAuthSession(rawSession);

    expect(safe).not.toHaveProperty('sessionTokenHash');
    expect(safe).not.toHaveProperty('revokedAt');
    expect((safe as any).sessionTokenHash).toBeUndefined();
    expect((safe as any).revokedAt).toBeUndefined();
    expect(safe.userId).toBe('usr-123');
  });
});

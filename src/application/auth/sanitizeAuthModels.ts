import { AuthUser, SafeAuthUser, AuthSession, SafeAuthSession } from './types';

export function toSafeAuthUser(user: AuthUser): SafeAuthUser {
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

export function toSafeAuthSession(session: AuthSession): SafeAuthSession {
  const { sessionTokenHash: _, revokedAt: __, ...safeSession } = session;
  return safeSession;
}

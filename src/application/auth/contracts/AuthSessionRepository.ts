import { AuthSession } from '../types';

export interface AuthSessionRepository {
  createSession(input: Omit<AuthSession, 'id' | 'createdAt' | 'lastTouchedAt' | 'revokedAt'>): Promise<AuthSession>;
  findByTokenHash(tokenHash: string): Promise<AuthSession | null>;
  revokeSession(sessionId: string): Promise<void>;
  touchSession(sessionId: string): Promise<void>;
  deleteExpiredSessions(): Promise<number>;
}

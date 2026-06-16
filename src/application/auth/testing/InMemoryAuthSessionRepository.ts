import { AuthSessionRepository } from '../contracts/AuthSessionRepository';
import { AuthSession } from '../types';

export class InMemoryAuthSessionRepository implements AuthSessionRepository {
  public sessions: AuthSession[] = [];

  async createSession(
    input: Omit<AuthSession, 'id' | 'createdAt' | 'lastTouchedAt' | 'revokedAt'>
  ): Promise<AuthSession> {
    const session: AuthSession = {
      id: `ses_${Math.random().toString(36).substring(2, 9)}`,
      userId: input.userId,
      sessionTokenHash: input.sessionTokenHash,
      createdAt: new Date(),
      expiresAt: input.expiresAt,
      lastTouchedAt: new Date(),
      revokedAt: null,
    };
    this.sessions.push(session);
    return { ...session };
  }

  async findByTokenHash(tokenHash: string): Promise<AuthSession | null> {
    const found = this.sessions.find((s) => s.sessionTokenHash === tokenHash);
    return found ? { ...found } : null;
  }

  async revokeSession(sessionId: string): Promise<void> {
    const index = this.sessions.findIndex((s) => s.id === sessionId);
    if (index !== -1) {
      this.sessions[index].revokedAt = new Date();
    }
  }

  async touchSession(sessionId: string): Promise<void> {
    const index = this.sessions.findIndex((s) => s.id === sessionId);
    if (index !== -1) {
      this.sessions[index].lastTouchedAt = new Date();
    }
  }

  async deleteExpiredSessions(): Promise<number> {
    const initialCount = this.sessions.length;
    const now = new Date();
    this.sessions = this.sessions.filter((s) => s.expiresAt.getTime() > now.getTime() && s.revokedAt === null);
    return initialCount - this.sessions.length;
  }
}

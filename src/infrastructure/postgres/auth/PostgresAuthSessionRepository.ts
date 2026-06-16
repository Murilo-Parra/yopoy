import { AuthSessionRepository } from '../../../application/auth/contracts/AuthSessionRepository';
import { AuthSession } from '../../../application/auth/types';
import { SqlExecutor } from '../executor/SqlExecutor';

export class PostgresAuthSessionRepository implements AuthSessionRepository {
  constructor(private executor: SqlExecutor) {}

  private toDomain(row: any): AuthSession {
    return {
      id: row.id,
      userId: row.user_id,
      sessionTokenHash: row.session_token_hash,
      createdAt: new Date(row.created_at),
      expiresAt: new Date(row.expires_at),
      lastTouchedAt: row.last_seen_at ? new Date(row.last_seen_at) : new Date(row.created_at),
      revokedAt: row.revoked_at ? new Date(row.revoked_at) : null,
    };
  }

  async createSession(input: Omit<AuthSession, 'id' | 'createdAt' | 'lastTouchedAt' | 'revokedAt'>): Promise<AuthSession> {
    let companyIdRes = await this.executor.execute<any[]>({
      sql: "SELECT current_setting('app.current_company_id', true) as company_id",
      mode: 'real',
      label: 'getCompanyId'
    });
    let companyId = companyIdRes[0]?.company_id;

    if (!companyId) {
      const membershipRows = await this.executor.execute<any[]>({
        sql: 'SELECT company_id FROM memberships WHERE user_id = $1 AND active = true LIMIT 1',
        params: [input.userId],
        mode: 'real',
        label: 'getMembershipCompanyId'
      });
      if (membershipRows.length > 0) {
        companyId = membershipRows[0].company_id;
      }
    }

    if (companyId) {
      await this.executor.execute({
        sql: `SELECT set_config('app.current_company_id', $1, true)`,
        params: [companyId],
        mode: 'real',
        label: 'setCompanyContext'
      });
    }

    const rows = await this.executor.execute<any[]>({
      sql: `
        INSERT INTO auth_sessions (
          company_id, user_id, session_token_hash, expires_at, created_at, last_seen_at
        ) VALUES (
          $1, $2, $3, $4, NOW(), NOW()
        ) RETURNING *;
      `,
      params: [companyId, input.userId, input.sessionTokenHash, input.expiresAt],
      mode: 'real',
      label: 'createSession'
    });

    return this.toDomain(rows[0]);
  }

  async findByTokenHash(tokenHash: string): Promise<AuthSession | null> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM auth_sessions WHERE session_token_hash = $1 LIMIT 1',
      params: [tokenHash],
      mode: 'real',
      label: 'findByTokenHash'
    });

    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE auth_sessions SET revoked_at = NOW() WHERE id = $1',
      params: [sessionId],
      mode: 'real',
      label: 'revokeSession'
    });
  }

  async touchSession(sessionId: string): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE auth_sessions SET last_seen_at = NOW() WHERE id = $1',
      params: [sessionId],
      mode: 'real',
      label: 'touchSession'
    });
  }

  async deleteExpiredSessions(): Promise<number> {
    const res = await this.executor.execute<any[]>({
      sql: 'DELETE FROM auth_sessions WHERE expires_at < NOW() OR revoked_at IS NOT NULL RETURNING id',
      mode: 'real',
      label: 'deleteExpiredSessions'
    });
    return res.length;
  }
}

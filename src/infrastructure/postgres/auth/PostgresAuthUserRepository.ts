import { AuthUserRepository } from '../../../application/auth/contracts/AuthUserRepository';
import { AuthUser } from '../../../application/auth/types';
import { SqlExecutor } from '../executor/SqlExecutor';

export class PostgresAuthUserRepository implements AuthUserRepository {
  constructor(private executor: SqlExecutor) {}

  private toDomain(row: any): AuthUser {
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash || '',
      companyId: row.company_id,
      createdAt: new Date(row.created_at),
      updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(row.created_at),
      failedLoginAttempts: row.failed_login_attempts || 0,
      lockedUntil: row.locked_until ? new Date(row.locked_until) : null,
      lastLoginAt: row.last_login ? new Date(row.last_login) : null,
    };
  }

  async findByEmail(email: string): Promise<AuthUser | null> {
    const cleanEmail = email.trim().toLowerCase();
    
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
      params: [cleanEmail],
      mode: 'real',
      label: 'findByEmail'
    });
    
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async findById(userId: string): Promise<AuthUser | null> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
      params: [userId],
      mode: 'real',
      label: 'findById'
    });

    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async createUser(input: Omit<AuthUser, 'id' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts' | 'lockedUntil' | 'lastLoginAt'>): Promise<AuthUser> {
    const cleanEmail = input.email.trim().toLowerCase();
    
    if (input.companyId) {
      await this.executor.execute({
        sql: `SELECT set_config('app.current_company_id', $1, true)`,
        params: [input.companyId],
        mode: 'real',
        label: 'setCompanyContext'
      });
    }

    const rows = await this.executor.execute<any[]>({
      sql: `
        INSERT INTO users (
          company_id, role, email, password_hash, active, failed_login_attempts, locked_until
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7
        ) RETURNING *;
      `,
      params: [
        input.companyId,
        'admin',
        cleanEmail,
        input.passwordHash,
        true,
        0,
        null
      ],
      mode: 'real',
      label: 'createUser'
    });
    return this.toDomain(rows[0]);
  }

  async updatePasswordHash(userId: string, passwordHash: string): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      params: [passwordHash, userId],
      mode: 'real',
      label: 'updatePasswordHash'
    });
  }

  async incrementFailedLogin(userId: string): Promise<number> {
    const rows = await this.executor.execute<any[]>({
      sql: 'UPDATE users SET failed_login_attempts = failed_login_attempts + 1, updated_at = NOW() WHERE id = $1 RETURNING failed_login_attempts',
      params: [userId],
      mode: 'real',
      label: 'incrementFailedLogin'
    });
    if (rows.length === 0) return 0;
    return rows[0].failed_login_attempts;
  }

  async resetFailedLogin(userId: string): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE users SET failed_login_attempts = 0, locked_until = NULL, updated_at = NOW() WHERE id = $1',
      params: [userId],
      mode: 'real',
      label: 'resetFailedLogin'
    });
  }

  async lockUserUntil(userId: string, date: Date): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE users SET locked_until = $1, updated_at = NOW() WHERE id = $2',
      params: [date, userId],
      mode: 'real',
      label: 'lockUserUntil'
    });
  }

  async updateLastLogin(userId: string, date: Date): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE users SET last_login = $1, updated_at = NOW() WHERE id = $2',
      params: [date, userId],
      mode: 'real',
      label: 'updateLastLogin'
    });
  }
}

import { describe, it, expect, beforeAll } from 'vitest';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - Auth RLS Isolation', () => {
  let hasDb = false;
  let dbUrl: string;

  beforeAll(async () => {
    dbUrl = process.env.DATABASE_URL || '';
    if (dbUrl) {
      try {
        assertLocalDatabaseUrl(dbUrl);
        const { Client } = await import('pg');
        const client = new Client({ connectionString: dbUrl, connectionTimeoutMillis: 1000 });
        await client.connect();
        await client.end();
        hasDb = true;
      } catch (err) {
        hasDb = false;
      }
    }
  });

  it('Should isolate auth tables using RLS (memberships, auth_sessions, auth_audit_logs, password_reset_tokens)', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const uow = new LocalPostgresUnitOfWork(executor);

    const pool = new Pool({ connectionString: dbUrl });
    const client = await pool.connect();

    const idC1 = randomUUID();
    const idC2 = randomUUID();
    let idU1: string;
    let idU2: string;

    try {
      await client.query('BEGIN');

      // Setup C1 Context
      await client.query("SELECT set_config('app.current_company_id', $1, true)", [idC1]);
      await client.query("INSERT INTO companies (id, name) VALUES ($1, 'Company A')", [idC1]);
      const u1 = await client.query(
        "INSERT INTO users (company_id, role, email) VALUES ($1, 'admin', 'userA@compA.com') RETURNING id;",
        [idC1]
      );
      idU1 = u1.rows[0].id;

      // Seed core auth tables for C1
      await client.query(
        "INSERT INTO memberships (company_id, user_id, role, active) VALUES ($1, $2, 'owner', true)",
        [idC1, idU1]
      );
      await client.query(
        "INSERT INTO auth_sessions (company_id, user_id, session_token_hash, expires_at) VALUES ($1, $2, 'token_hash_A', now() + interval '1 hour')",
        [idC1, idU1]
      );
      await client.query(
        "INSERT INTO auth_audit_logs (company_id, user_id, event_type, success, reason) VALUES ($1, $2, 'login_success', true, 'Pass')",
        [idC1, idU1]
      );
      await client.query(
        "INSERT INTO password_reset_tokens (company_id, user_id, reset_token_hash, expires_at) VALUES ($1, $2, 'token_reset_hash_A', now() + interval '1 hour')",
        [idC1, idU1]
      );

      // Setup C2 Context (Company B)
      await client.query("SELECT set_config('app.current_company_id', $1, true)", [idC2]);
      await client.query("INSERT INTO companies (id, name) VALUES ($1, 'Company B')", [idC2]);
      const u2 = await client.query(
        "INSERT INTO users (company_id, role, email) VALUES ($1, 'admin', 'userB@compB.com') RETURNING id;",
        [idC2]
      );
      idU2 = u2.rows[0].id;

      // Seed core auth tables for C2
      await client.query(
        "INSERT INTO memberships (company_id, user_id, role, active) VALUES ($1, $2, 'employee', true)",
        [idC2, idU2]
      );
      await client.query(
        "INSERT INTO auth_sessions (company_id, user_id, session_token_hash, expires_at) VALUES ($1, $2, 'token_hash_B', now() + interval '1 hour')",
        [idC2, idU2]
      );
      await client.query(
        "INSERT INTO auth_audit_logs (company_id, user_id, event_type, success, reason) VALUES ($1, $2, 'login_success', true, 'Pass')",
        [idC2, idU2]
      );
      await client.query(
        "INSERT INTO password_reset_tokens (company_id, user_id, reset_token_hash, expires_at) VALUES ($1, $2, 'token_reset_hash_B', now() + interval '1 hour')",
        [idC2, idU2]
      );

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    // Check Company A Context Isolation
    await uow.transaction(idC1, async (tx) => {
      const memberships = await tx.executor.execute<Array<{ company_id: string; user_id: string }>>({ sql: 'SELECT * FROM memberships' });
      const sessions = await tx.executor.execute<Array<{ company_id: string; session_token_hash: string }>>({ sql: 'SELECT * FROM auth_sessions' });
      const auditLogs = await tx.executor.execute<Array<{ company_id: string; event_type: string }>>({ sql: 'SELECT * FROM auth_audit_logs' });
      const resetTokens = await tx.executor.execute<Array<{ company_id: string; reset_token_hash: string }>>({ sql: 'SELECT * FROM password_reset_tokens' });

      expect(memberships.length).toBe(1);
      expect(memberships[0].company_id).toBe(idC1);
      expect(memberships[0].user_id).toBe(idU1);

      expect(sessions.length).toBe(1);
      expect(sessions[0].company_id).toBe(idC1);
      expect(sessions[0].session_token_hash).toBe('token_hash_A');

      expect(auditLogs.length).toBe(1);
      expect(auditLogs[0].company_id).toBe(idC1);
      expect(auditLogs[0].event_type).toBe('login_success');

      expect(resetTokens.length).toBe(1);
      expect(resetTokens[0].company_id).toBe(idC1);
      expect(resetTokens[0].reset_token_hash).toBe('token_reset_hash_A');
    });

    // Check Company B Context Isolation
    await uow.transaction(idC2, async (tx) => {
      const memberships = await tx.executor.execute<Array<{ company_id: string; user_id: string }>>({ sql: 'SELECT * FROM memberships' });
      const sessions = await tx.executor.execute<Array<{ company_id: string; session_token_hash: string }>>({ sql: 'SELECT * FROM auth_sessions' });
      const auditLogs = await tx.executor.execute<Array<{ company_id: string; event_type: string }>>({ sql: 'SELECT * FROM auth_audit_logs' });
      const resetTokens = await tx.executor.execute<Array<{ company_id: string; reset_token_hash: string }>>({ sql: 'SELECT * FROM password_reset_tokens' });

      expect(memberships.length).toBe(1);
      expect(memberships[0].company_id).toBe(idC2);
      expect(memberships[0].user_id).toBe(idU2);

      expect(sessions.length).toBe(1);
      expect(sessions[0].company_id).toBe(idC2);
      expect(sessions[0].session_token_hash).toBe('token_hash_B');

      expect(auditLogs.length).toBe(1);
      expect(auditLogs[0].company_id).toBe(idC2);
      expect(auditLogs[0].event_type).toBe('login_success');

      expect(resetTokens.length).toBe(1);
      expect(resetTokens[0].company_id).toBe(idC2);
      expect(resetTokens[0].reset_token_hash).toBe('token_reset_hash_B');
    });

    // Check without active context (Should return 0 rows for all tables under RLS)
    const emptyContextMemberships = await pool.query('SELECT * FROM memberships');
    expect(emptyContextMemberships.rows.length).toBe(0);

    const emptyContextSessions = await pool.query('SELECT * FROM auth_sessions');
    expect(emptyContextSessions.rows.length).toBe(0);

    const emptyContextAuditLogs = await pool.query('SELECT * FROM auth_audit_logs');
    expect(emptyContextAuditLogs.rows.length).toBe(0);

    const emptyContextResetTokens = await pool.query('SELECT * FROM password_reset_tokens');
    expect(emptyContextResetTokens.rows.length).toBe(0);

    await pool.end();
    await executor.end();
  });
});

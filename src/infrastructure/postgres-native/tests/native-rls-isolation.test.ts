import { describe, it, expect, beforeAll } from 'vitest';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - RLS Isolation', () => {
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

  it('Should isolate companies using RLS', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const uow = new LocalPostgresUnitOfWork(executor);

    // Setup: Create 2 companies and 2 users using proper contexts
    const pool = new Pool({ connectionString: dbUrl });
    const client = await pool.connect();
    
    const idC1 = randomUUID();
    const idC2 = randomUUID();
    let idU1: string;
    let idU2: string;

    try {
      await client.query('BEGIN');
      
      await client.query(`
        TRUNCATE TABLE 
          sale_items,
          payments,
          sales,
          users,
          companies
        RESTART IDENTITY CASCADE;
      `);

      // Setup C1
      await client.query("SELECT set_config('app.current_company_id', $1, true)", [idC1]);
      await client.query("INSERT INTO companies (id, name) VALUES ($1, 'C1')", [idC1]);
      const u1 = await client.query("INSERT INTO users (company_id, role, email) VALUES ($1, 'admin', 'u1@c1.com') RETURNING id;", [idC1]);
      idU1 = u1.rows[0].id;
      await client.query("INSERT INTO sales (company_id, status, total_amount, currency, created_by) VALUES ($1, 'closed', 100, 'BRL', $2)", [idC1, idU1]);

      // Setup C2
      await client.query("SELECT set_config('app.current_company_id', $1, true)", [idC2]);
      await client.query("INSERT INTO companies (id, name) VALUES ($1, 'C2')", [idC2]);
      const u2 = await client.query("INSERT INTO users (company_id, role, email) VALUES ($1, 'admin', 'u2@c2.com') RETURNING id;", [idC2]);
      idU2 = u2.rows[0].id;
      await client.query("INSERT INTO sales (company_id, status, total_amount, currency, created_by) VALUES ($1, 'closed', 200, 'BRL', $2)", [idC2, idU2]);

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    // Test C1
    let contextSalesC1: any[] = [];
    await uow.transaction(idC1, async (tx) => {
      contextSalesC1 = await tx.executor.execute({ sql: 'SELECT * FROM sales' });
    });
    
    expect(contextSalesC1.length).toBe(1);
    expect(contextSalesC1[0].company_id).toBe(idC1);

    // Test C2
    let contextSalesC2: any[] = [];
    await uow.transaction(idC2, async (tx) => {
      contextSalesC2 = await tx.executor.execute({ sql: 'SELECT * FROM sales' });
    });

    expect(contextSalesC2.length).toBe(1);
    expect(contextSalesC2[0].company_id).toBe(idC2);

    // Test without context
    const withoutContextResult = await pool.query('SELECT * FROM sales');
    expect(withoutContextResult.rows.length).toBe(0);

    await pool.end();
    await executor.end(); // Don't forget to close!
  });
});

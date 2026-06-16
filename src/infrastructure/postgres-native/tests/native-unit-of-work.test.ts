import { describe, it, expect, beforeAll } from 'vitest';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - Unit of Work', () => {
  let hasDb = false;
  let dbUrl: string;

  beforeAll(() => {
    dbUrl = process.env.DATABASE_URL || '';
    if (dbUrl) {
      try {
        assertLocalDatabaseUrl(dbUrl);
        hasDb = true;
      } catch (err) {
        hasDb = false;
      }
    }
  });

  it('Should commit on success and rollback on error', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const uow = new LocalPostgresUnitOfWork(executor);
    const pool = new Pool({ connectionString: dbUrl });

    // Setup an admin user to use created_by because FK demands it
    const idC1 = randomUUID();
    let idU1: string;
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      await client.query("SELECT set_config('app.current_company_id', $1, true)", [idC1]);
      await client.query("INSERT INTO companies (id, name) VALUES ($1, 'UoW Comp')", [idC1]);
      const u1 = await client.query("INSERT INTO users (company_id, role, email) VALUES ($1, 'admin', 'uow@c1.com') RETURNING id;", [idC1]);
      idU1 = u1.rows[0].id;
      
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    // Test rollback
    try {
      await uow.transaction(idC1, async (tx) => {
        await tx.executor.execute({ 
          sql: `INSERT INTO sales (company_id, status, total_amount, currency, created_by) VALUES ($1, 'closed', 100, 'BRL', $2)`,
          params: [idC1, idU1]
        });
        
        throw new Error('Fake Error To Trigger Rollback');
      });
    } catch (err) {
      // expected
    }

    // Now verify the sale was NOT inserted
    let countCheck = 0;
    await uow.transaction(idC1, async (tx) => {
      const res: any = await tx.executor.execute({ sql: `SELECT COUNT(*) FROM sales WHERE company_id = $1`, params: [idC1] });
      countCheck = parseInt(res[0].count, 10);
    });
    expect(countCheck).toBe(0);

    // Test commit
    await uow.transaction(idC1, async (tx) => {
      await tx.executor.execute({ 
        sql: `INSERT INTO sales (company_id, status, total_amount, currency, created_by) VALUES ($1, 'closed', 100, 'BRL', $2)`,
        params: [idC1, idU1]
      });
    });

    let countCheck2 = 0;
    await uow.transaction(idC1, async (tx) => {
      const res: any = await tx.executor.execute({ sql: `SELECT COUNT(*) FROM sales WHERE company_id = $1`, params: [idC1] });
      countCheck2 = parseInt(res[0].count, 10);
    });
    expect(countCheck2).toBe(1);

    await pool.end();
    await executor.end();
  });
});

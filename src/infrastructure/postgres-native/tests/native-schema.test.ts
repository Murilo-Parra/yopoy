import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - Schema Test', () => {
  let pool: Pool;
  let hasDb = false;

  beforeAll(() => {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      try {
        assertLocalDatabaseUrl(dbUrl);
        pool = new Pool({ connectionString: dbUrl });
        hasDb = true;
      } catch (err) {
        hasDb = false;
      }
    }
  });

  afterAll(async () => {
    if (pool) {
      await pool.end();
    }
  });

  it('Should have tables created', async () => {
    if (!hasDb) return; // Skip if no DB

    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = result.rows.map(r => r.table_name);
    
    expect(tables).toContain('companies');
    expect(tables).toContain('users');
    expect(tables).toContain('sales');
    expect(tables).toContain('payments');
  });
});

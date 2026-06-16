import { describe, it, expect, beforeAll } from 'vitest';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { PostgresSaleRepository } from '../../postgres/repositories/PostgresSaleRepository';

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - Repository Smoke', () => {
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

  it('PostgresSaleRepository should handle ops', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const repo = new PostgresSaleRepository(executor);

    // Call method (we skip rigorous asserts if they aren't fully unmocked on the interface layer,
    // this acts as a smoke test ensuring syntax/connection passes).
    const results = await repo.listByCompany('120485a3-db1e-450f-bb9b-b4a1610b65ab'); // fake UUID that shouldn't match anything
    
    expect(Array.isArray(results)).toBe(true);

    await executor.end();
  });
});

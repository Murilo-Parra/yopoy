import { describe, it, expect, vi } from 'vitest';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';

// Note: To test the actual schema creation we'd need a running postgres.
// We'll mock the 'pg' Pool so we can write unit test logic and test connectivity behaviour without Docker daemon in AI Studio.

vi.mock('pg', () => {
  class MockClient {
    query = vi.fn();
    release = vi.fn();
  }
  class MockPool {
    connect = vi.fn().mockResolvedValue(new MockClient());
    query = vi.fn().mockResolvedValue({ sorted: [], rows: [] });
    end = vi.fn();
  }
  return { Pool: MockPool, Client: MockClient };
});

describe('Local Postgres Sandbox - Schema Emulation', () => {
  it('LocalPostgresSqlExecutor should instantiate pool properly for local url', () => {
    const executor = new LocalPostgresSqlExecutor('postgres://user:pass@localhost/db');
    expect(executor).toBeDefined();
  });

  it('Running a query should push command and execute on pool', async () => {
    const executor = new LocalPostgresSqlExecutor('postgres://user:pass@localhost/db');
    
    await executor.execute({
      sql: 'SELECT * FROM companies',
      mode: 'postgres-local-sandbox' as any
    });

    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(1);
    expect(cmds[0].sql).toBe('SELECT * FROM companies');
  });
});

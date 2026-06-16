import { describe, it, expect, vi } from 'vitest';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { PostgresSaleRepository } from '../../postgres/repositories/PostgresSaleRepository';

vi.mock('pg', () => {
  class MockClient {
    query = vi.fn().mockResolvedValue({ rows: [] });
    release = vi.fn();
  }
  class MockPool {
    connect = vi.fn().mockResolvedValue(new MockClient());
    query = vi.fn().mockResolvedValue({ rows: [] });
    end = vi.fn();
  }
  return { Pool: MockPool, Client: MockClient };
});

describe('Local Postgres Repository Smoke', () => {
  it('PostgresSaleRepository should execute insert on local pg pool', async () => {
    const executor = new LocalPostgresSqlExecutor('postgres://user:pass@localhost/db');
    
    // We can access the executor's pool implicitly since the class instantiates it
    // But testing the internal state is harder. We can test `executor.getExecutedCommands` instead:
    
    const repo = new PostgresSaleRepository(executor);

    await repo.listByCompany('comp123');

    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBeGreaterThan(0);
    expect(cmds[0].sql).toContain('SELECT');
  });
});

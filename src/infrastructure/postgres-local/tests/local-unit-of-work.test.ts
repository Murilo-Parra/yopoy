import { describe, it, expect, vi } from 'vitest';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';

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

describe('Local Postgres Unit Of Work', () => {
  it('Should rollback transaction on error', async () => {
    const executor = new LocalPostgresSqlExecutor('postgres://user:pass@localhost/db');
    const uow = new LocalPostgresUnitOfWork(executor);
    const client = await executor.getClient();

    await expect(uow.transaction('comp_123', async (tx) => {
      await tx.executor.execute({ sql: 'INSERT INTO sales', params: [] });
      throw new Error('Some random error');
    })).rejects.toThrow('Some random error');

    expect(client.query).toHaveBeenCalledWith('BEGIN');
    expect(client.query).toHaveBeenCalledWith('ROLLBACK');
    expect(client.release).toHaveBeenCalled();
  });
});

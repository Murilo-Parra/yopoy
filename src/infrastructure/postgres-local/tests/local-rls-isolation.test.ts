import { describe, it, expect, vi } from 'vitest';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';
import pg from 'pg';

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

describe('Local Postgres RLS Isolation', () => {
  it('Should set current_company_id setting inside transaction', async () => {
    const executor = new LocalPostgresSqlExecutor('postgres://user:pass@localhost/db');
    const uow = new LocalPostgresUnitOfWork(executor);
    
    // the mock client query fn
    const client = await executor.getClient();

    await uow.transaction('company_xyz', async (tx) => {
      return true;
    });

    expect(client.query).toHaveBeenCalledWith('BEGIN');
    expect(client.query).toHaveBeenCalledWith(
      `SELECT set_config('app.current_company_id', $1, true)`, 
      ['company_xyz']
    );
    expect(client.query).toHaveBeenCalledWith('COMMIT');
    expect(client.release).toHaveBeenCalled();
  });
});

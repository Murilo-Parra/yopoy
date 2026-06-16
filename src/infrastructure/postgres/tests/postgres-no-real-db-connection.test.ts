import { describe, it, expect } from 'vitest';
import { createServerAppContainer } from '../../../composition/createServerAppContainer';
import { BlockedSqlExecutor } from '../executor/BlockedSqlExecutor';
import { PostgresInfrastructureError } from '../errors/PostgresInfrastructureError';

describe('Postgres Restrictions - No Real DB Connection', () => {
  it('createServerAppContainer("postgres") should throw POSTGRES_ADAPTER_NOT_IMPLEMENTED', () => {
    expect(() => {
      createServerAppContainer('postgres');
    }).toThrow(/POSTGRES_ADAPTER_NOT_IMPLEMENTED/);
  });

  it('BlockedSqlExecutor should throw PostgresInfrastructureError on execute', async () => {
    const executor = new BlockedSqlExecutor();
    
    let thrownError: any = null;
    try {
      await executor.execute({
        sql: 'SELECT * FROM users',
        mode: 'real'
      });
    } catch (e) {
      thrownError = e;
    }

    expect(thrownError).toBeInstanceOf(PostgresInfrastructureError);
    expect(thrownError.code).toBe('DATABASE_EXECUTION_BLOCKED');
  });
});

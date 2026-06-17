import { PoolClient } from 'pg';
import { UnitOfWork, TransactionContext } from './UnitOfWork';
import { LocalPostgresSqlExecutor } from '../executor/LocalPostgresSqlExecutor';
import { SqlExecutor } from '../executor/SqlExecutor';
import { SqlCommand } from '../executor/SqlCommand';

export class LocalPostgresUnitOfWork implements UnitOfWork {
  constructor(private executor: LocalPostgresSqlExecutor) {}

  async transaction<T>(
    companyId: string,
    fn: (tx: TransactionContext) => Promise<T>
  ): Promise<T> {
    const client: PoolClient = await this.executor.getClient();

    try {
      await client.query('BEGIN');
      await client.query(
        `SELECT set_config('app.current_company_id', $1, true)`,
        [companyId]
      );

      const localizedExecutor: SqlExecutor = {
        execute: async <K = unknown>(cmd: SqlCommand): Promise<K> => {
          const result = await client.query(
            cmd.sql,
            cmd.params ? [...cmd.params] : []
          );

          return result.rows as K;
        }
      };

      const result = await fn({ executor: localizedExecutor });

      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

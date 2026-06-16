import { PoolClient } from 'pg';
import { UnitOfWork, TransactionContext } from './UnitOfWork';
import { LocalPostgresSqlExecutor } from '../executor/LocalPostgresSqlExecutor';

export class LocalPostgresUnitOfWork implements UnitOfWork {
  constructor(private executor: LocalPostgresSqlExecutor) {}

  async transaction<T>(companyId: string, fn: (tx: TransactionContext) => Promise<T>): Promise<T> {
    const client: PoolClient = await this.executor.getClient();
    
    try {
      await client.query('BEGIN');
      await client.query(`SELECT set_config('app.current_company_id', $1, true)`, [companyId]);

      // Create a localized executor that uses this specific client
      const localizedExecutor = {
        execute: async (cmd: any) => {
          const res = await client.query(cmd.sql, cmd.params);
          return res.rows as any;
        }
      };

      const result = await fn({ executor: localizedExecutor });

      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err; // bubble up
    } finally {
      client.release();
    }
  }
}

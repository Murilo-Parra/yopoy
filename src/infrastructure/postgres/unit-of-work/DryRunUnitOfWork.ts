import { UnitOfWork, TransactionContext } from './UnitOfWork';
import { SqlExecutor } from '../executor/SqlExecutor';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';

export class DryRunUnitOfWork implements UnitOfWork {
  constructor(private executor: DryRunSqlExecutor) {}

  async transaction<T>(companyId: string, fn: (tx: TransactionContext) => Promise<T>): Promise<T> {
    // 1. Simulate BEGIN
    await this.executor.execute({
      sql: 'BEGIN -- DRY RUN ONLY',
      mode: 'dry-run',
      label: 'Transaction Start'
    });

    // 2. Simulate RLS Setup
    await this.executor.execute({
      sql: `SELECT set_config('app.current_company_id', $1, true); -- DRY RUN ONLY`,
      params: [companyId],
      mode: 'dry-run',
      label: 'Set RLS Context'
    });

    try {
      // 3. Execute function
      const result = await fn({ executor: this.executor });

      // 4. Simulate COMMIT
      await this.executor.execute({
        sql: 'COMMIT -- DRY RUN ONLY',
        mode: 'dry-run',
        label: 'Transaction Commit'
      });

      return result;
    } catch (error) {
      // 5. Simulate ROLLBACK
      await this.executor.execute({
        sql: 'ROLLBACK -- DRY RUN ONLY',
        mode: 'dry-run',
        label: 'Transaction Rollback'
      });
      throw error;
    }
  }
}

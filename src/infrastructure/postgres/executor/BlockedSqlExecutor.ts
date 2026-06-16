import { SqlCommand } from './SqlCommand';
import { SqlExecutor } from './SqlExecutor';
import { PostgresInfrastructureError } from '../errors/PostgresInfrastructureError';

export class BlockedSqlExecutor implements SqlExecutor {
  async execute<T = unknown>(command: SqlCommand): Promise<T> {
    throw new PostgresInfrastructureError(
      'DATABASE_EXECUTION_BLOCKED',
      'Real database execution is strictly blocked in this context. Use DryRunSqlExecutor for simulations.'
    );
  }
}

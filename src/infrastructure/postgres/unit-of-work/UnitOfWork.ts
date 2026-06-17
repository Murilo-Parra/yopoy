import { SqlExecutor } from '../executor/SqlExecutor';

export interface TransactionContext {
  executor: SqlExecutor;
}

export interface UnitOfWork {
  transaction<T>(companyId: string, fn: (tx: TransactionContext) => Promise<T>): Promise<T>;
}

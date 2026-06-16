import { PoolClient } from "pg";

export interface IFiscalTransactionRunner {
  runRollbackOnly<T>(operationName: string, callback: (client: PoolClient) => Promise<T>): Promise<T>;
  assertRollbackOnly(): void;
}

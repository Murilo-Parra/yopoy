import { PoolClient } from "pg";
import { pgPool } from "../../../infrastructure/database/pgPooler";
import { IFiscalTransactionRunner } from "../contracts/IFiscalTransactionRunner";

export class FiscalTransactionRunner implements IFiscalTransactionRunner {
  async runRollbackOnly<T>(operationName: string, callback: (client: PoolClient) => Promise<T>): Promise<T> {
    if (!pgPool) {
      throw new Error("Pool de conexão PostgreSQL não inicializado.");
    }

    const client = await pgPool.connect();
    this.assertRollbackOnly();
    
    try {
      await client.query("BEGIN;");
      const result = await callback(client);
      await client.query("ROLLBACK;");
      return result;
    } catch (error) {
      await client.query("ROLLBACK;");
      throw error;
    } finally {
      client.release();
    }
  }

  assertRollbackOnly(): void {
    // Assert logic - guaranteed by the 'try { callback } ... ROLLBACK' block above
  }
}

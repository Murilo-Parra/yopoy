import { Pool } from 'pg';
import { SqlCommand } from '../executor/SqlCommand';
import { SqlExecutor } from '../executor/SqlExecutor';
import { assertLocalDatabaseUrl } from '../guards/assertLocalDatabaseUrl';

/**
 * Local Sandbox Postgres Executor
 * STRICTLY uses local pool and connects to localhost/127.0.0.1
 * NOT for production.
 */
export class LocalPostgresSqlExecutor implements SqlExecutor {
  private pool: Pool;
  private executedCommands: SqlCommand[] = []; // for local debug

  constructor(databaseUrl: string) {
    // 1. Guardrail explicitly blocks remote URLs
    assertLocalDatabaseUrl(databaseUrl);

    // 2. Init pool
    this.pool = new Pool({
      connectionString: databaseUrl,
    });
  }

  async execute<T = unknown>(command: SqlCommand): Promise<T> {
    // We can allow internal command mode flag if we want
    this.executedCommands.push({ ...command, mode: 'postgres-local-sandbox' as any });

    try {
      const result = await this.pool.query(command.sql, command.params);
      return result.rows as any as T;
    } catch (err) {
      console.error('LocalPostgresSqlExecutor Error:', err);
      throw err;
    }
  }

  /**
   * For testing integration with the same pool instance
   */
  async getClient() {
    return this.pool.connect();
  }

  async end() {
    await this.pool.end();
  }

  getExecutedCommands() {
    return this.executedCommands;
  }
}

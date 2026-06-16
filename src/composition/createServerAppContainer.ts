import { AppContainer, PersistenceMode } from './types';
import { createInMemoryRepositories } from './createInMemoryRepositories';
import { createUseCases } from './createUseCases';
import { createHandlers } from './createHandlers';
import { createPostgresDryRunRepositories } from '../infrastructure/postgres/createPostgresDryRunRepositories';
import { createPostgresLocalRepositories } from '../infrastructure/postgres/createPostgresLocalRepositories';
import { DryRunSqlExecutor } from '../infrastructure/postgres/executor/DryRunSqlExecutor';
import { LocalPostgresSqlExecutor } from '../infrastructure/postgres/executor/LocalPostgresSqlExecutor';

export function createServerAppContainer(mode: PersistenceMode = 'in-memory'): AppContainer {
  if (mode === 'postgres') {
    throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED: Postgres mode is blocked. Use in-memory, postgres-dry-run or postgres-local-sandbox.');
  }

  let repositories;
  
  if (mode === 'postgres-local-sandbox') {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error('DATABASE_URL required for postgres-local-sandbox');
    const localExecutor = new LocalPostgresSqlExecutor(dbUrl);
    repositories = createPostgresLocalRepositories(localExecutor);
  } else if (mode === 'postgres-dry-run') {
    const executor = new DryRunSqlExecutor(); // Useful for 'postgres-dry-run'
    repositories = createPostgresDryRunRepositories(executor);
  } else {
    repositories = createInMemoryRepositories();
  }
    
  const useCases = createUseCases(repositories);
  const handlers = createHandlers(useCases, repositories);

  return {
    mode,
    repositories,
    useCases,
    handlers
  };
}

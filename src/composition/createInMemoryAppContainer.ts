import { AppContainer } from './types';
import { createInMemoryRepositories } from './createInMemoryRepositories';
import { createUseCases } from './createUseCases';
import { createHandlers } from './createHandlers';

export function createInMemoryAppContainer(): AppContainer {
  const mode = 'in-memory';
  const repositories = createInMemoryRepositories();
  const useCases = createUseCases(repositories);
  const handlers = createHandlers(useCases, repositories);

  return {
    mode,
    repositories,
    useCases,
    handlers
  };
}

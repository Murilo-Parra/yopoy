import { describe, it, expect } from 'vitest';
import { createServerAppContainer } from '../../../composition/createServerAppContainer';

describe('Postgres Real Execution Blocking', () => {
  it('Should successfully create container for in-memory mode', () => {
    const container = createServerAppContainer('in-memory');
    expect(container).toBeDefined();
    expect(container.useCases).toBeDefined();
  });

  it('Should successfully create container for postgres-dry-run mode', () => {
    const container = createServerAppContainer('postgres-dry-run');
    expect(container).toBeDefined();
    expect(container.useCases).toBeDefined();
  });

  it('Should absolutely block creation of postgres mode container', () => {
    expect(() => {
      createServerAppContainer('postgres');
    }).toThrow('POSTGRES_ADAPTER_NOT_IMPLEMENTED');
  });
});

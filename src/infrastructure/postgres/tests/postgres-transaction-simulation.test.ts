import { describe, it, expect } from 'vitest';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';
import { DryRunUnitOfWork } from '../unit-of-work/DryRunUnitOfWork';

describe('Postgres Transaction Simulation', () => {
  it('Should simulate BEGIN and COMMIT on success', async () => {
    const executor = new DryRunSqlExecutor();
    const uow = new DryRunUnitOfWork(executor);

    await uow.transaction('comp_123', async (tx) => {
      await tx.executor.execute({
        sql: 'INSERT INTO partial_table (id, company_id) VALUES ($1, $2)',
        params: ['1', 'comp_123'],
        mode: 'dry-run',
        label: 'Insert partial'
      });
      return 'success';
    });

    const cmds = executor.getExecutedCommands();
    expect(cmds[0].sql).toContain('BEGIN');
    
    // There might be a set_config for row level security simulation
    let isCommitted = false;
    for (const cmd of cmds) {
      if (cmd.sql.includes('COMMIT')) {
        isCommitted = true;
      }
    }
    expect(isCommitted).toBe(true);
  });

  it('Should simulate BEGIN and ROLLBACK on error', async () => {
    const executor = new DryRunSqlExecutor();
    const uow = new DryRunUnitOfWork(executor);

    await expect(uow.transaction('comp_123', async (tx) => {
      await tx.executor.execute({
        sql: 'INSERT INTO partial_table (id, company_id) VALUES ($1, $2)',
        params: ['1', 'comp_123'],
        mode: 'dry-run',
        label: 'Insert partial'
      });
      throw new Error('Simulated flow error');
    })).rejects.toThrow('Simulated flow error');

    const cmds = executor.getExecutedCommands();
    expect(cmds[0].sql).toContain('BEGIN');
    
    let isRolledBack = false;
    for (const cmd of cmds) {
      if (cmd.sql.toLowerCase().includes('rollback')) {
        isRolledBack = true;
      }
    }
    expect(isRolledBack).toBe(true);
  });
});

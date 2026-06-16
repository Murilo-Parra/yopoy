import { describe, it, expect } from 'vitest';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';
import { DryRunUnitOfWork } from '../unit-of-work/DryRunUnitOfWork';

describe('DryRunUnitOfWork', () => {
  it('should emit BEGIN and COMMIT for success transaction', async () => {
    const executor = new DryRunSqlExecutor();
    const uow = new DryRunUnitOfWork(executor);

    await uow.transaction('comp123', async (tx) => {
      // Simulate internal operation
      await tx.executor.execute({
        sql: 'SELECT 1',
        mode: 'dry-run'
      });
      return 'success';
    });

    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(4); // BEGIN, Set Context, SELECT, COMMIT
    expect(cmds[0].sql).toContain('BEGIN');
    expect(cmds[1].sql).toContain('set_config');
    expect(cmds[2].sql).toContain('SELECT 1');
    expect(cmds[3].sql).toContain('COMMIT');
  });

  it('should emit BEGIN and ROLLBACK on error', async () => {
    const executor = new DryRunSqlExecutor();
    const uow = new DryRunUnitOfWork(executor);

    await expect(uow.transaction('comp123', async () => {
      throw new Error('Fake conflict logic');
    })).rejects.toThrow('Fake conflict logic');

    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(3); // BEGIN, Set Context, ROLLBACK
    expect(cmds[0].sql).toContain('BEGIN');
    expect(cmds[1].sql).toContain('set_config');
    expect(cmds[2].sql).toContain('ROLLBACK');
  });
});

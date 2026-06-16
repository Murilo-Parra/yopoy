import { describe, it, expect } from 'vitest';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';

describe('DryRunSqlExecutor', () => {
  it('should store executed commands without real execution', async () => {
    const executor = new DryRunSqlExecutor();
    
    await executor.execute({
      sql: 'SELECT * FROM users WHERE company_id = $1',
      params: ['company123'],
      mode: 'dry-run',
      label: 'Get users'
    });

    const commands = executor.getExecutedCommands();
    expect(commands).toHaveLength(1);
    expect(commands[0].sql).toContain('SELECT * FROM users');
    expect(commands[0].params).toEqual(['company123']);
    expect(commands[0].mode).toBe('dry-run');
  });
});

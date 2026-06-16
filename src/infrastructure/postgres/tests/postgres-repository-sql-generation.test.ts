import { describe, it, expect } from 'vitest';
import { PostgresSaleRepository } from '../repositories/PostgresSaleRepository';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';
import { Sale } from '../../../domain/entities';

describe('PostgresRepository SQL Generation', () => {
  it('should generate SQL with company_id for create sale', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresSaleRepository(executor);
    
    const fakeSale: Sale = {
      id: 'sale123',
      company_id: 'comp999',
      status: 'ACTIVE',
      total_amount: 100,
      discount_amount: 0,
      items: [],
      created_at: new Date('2024-01-01T00:00:00.000Z'),
      updated_at: new Date('2024-01-01T00:00:00.000Z'),
      version: 1
    };

    await repo.create(fakeSale);

    const cmds = executor.getExecutedCommands();
    expect(cmds).toHaveLength(1);
    
    const cmd = cmds[0];
    expect(cmd.sql).toContain('INSERT INTO sales');
    // Ensure company_id param is there
    expect(cmd.params).toContain('comp999');
    expect(cmd.mode).toBe('dry-run');
  });

  it('should generate SQL with company_id constraint for findById', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresSaleRepository(executor);

    await repo.findById('comp999', 'sale123');
    
    const cmds = executor.getExecutedCommands();
    const cmd = cmds[0];
    
    expect(cmd.sql).toContain('WHERE company_id = $1');
    expect(cmd.params).toEqual(['comp999', 'sale123']);
  });
});

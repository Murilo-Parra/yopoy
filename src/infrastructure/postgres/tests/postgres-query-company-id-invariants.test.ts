import { describe, it, expect } from 'vitest';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';
import { PostgresSaleRepository } from '../repositories/PostgresSaleRepository';
import { PostgresPaymentRepository } from '../repositories/PostgresPaymentRepository';
import { PostgresCashSessionRepository } from '../repositories/PostgresCashSessionRepository';
import { PostgresExpenseRepository } from '../repositories/PostgresExpenseRepository';
import { PostgresLedgerRepository } from '../repositories/PostgresLedgerRepository';
import { PostgresAuditLogRepository } from '../repositories/PostgresAuditLogRepository';

describe('Postgres Query Invariants', () => {
  it('SaleRepository queries should enforce company_id', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresSaleRepository(executor);

    await repo.findById('company_123', 'sale_123');
    await repo.listByCompany('company_123');
    
    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(2);
    for (const cmd of cmds) {
      expect(cmd.sql).toContain('company_id = $');
      expect(cmd.params).toContain('company_123');
    }
  });

  it('PaymentRepository queries should enforce company_id', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresPaymentRepository(executor);

    await repo.findById('company_123', 'payment_123');
    await repo.listByCompany('company_123');
    await repo.getLinksBySale('company_123', 'sale_123');
    
    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(3);
    for (const cmd of cmds) {
      // getLinksBySale uses s.company_id = $1 so we must check case insensitive
      expect(cmd.sql.toLowerCase()).toContain('company_id');
      expect(cmd.params).toContain('company_123');
    }
  });

  it('CashSessionRepository queries should enforce company_id', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresCashSessionRepository(executor);

    await repo.findById('company_123', 'session_123');
    await repo.findActiveSession('company_123');
    await repo.listMovements('company_123', 'session_123');
    
    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(3);
    for (const cmd of cmds) {
      expect(cmd.sql).toContain('company_id = $');
      expect(cmd.params).toContain('company_123');
    }
  });

  it('ExpenseRepository queries should enforce company_id', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresExpenseRepository(executor);

    await repo.findById('company_123', 'expense_123');
    await repo.listByCompany('company_123');
    
    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(2);
    for (const cmd of cmds) {
      expect(cmd.sql).toContain('company_id = $');
      expect(cmd.params).toContain('company_123');
    }
  });
  
  it('LedgerRepository queries should enforce company_id', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresLedgerRepository(executor);

    await repo.listByCompany('company_123');
    
    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(1);
    for (const cmd of cmds) {
      expect(cmd.sql).toContain('company_id = $');
      expect(cmd.params).toContain('company_123');
    }
  });
});

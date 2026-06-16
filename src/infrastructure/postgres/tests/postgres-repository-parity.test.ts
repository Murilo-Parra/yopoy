import { describe, it, expect } from 'vitest';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';
import { PostgresSaleRepository } from '../repositories/PostgresSaleRepository';
import { PostgresPaymentRepository } from '../repositories/PostgresPaymentRepository';
import { PostgresCashSessionRepository } from '../repositories/PostgresCashSessionRepository';
import { PostgresExpenseRepository } from '../repositories/PostgresExpenseRepository';
import { PostgresLedgerRepository } from '../repositories/PostgresLedgerRepository';
import { PostgresAuditLogRepository } from '../repositories/PostgresAuditLogRepository';

describe('Postgres Repository Parity', () => {
  const executor = new DryRunSqlExecutor();

  it('SaleRepository should implement create, update, findById, listByCompany, addSaleItem', () => {
    const repo = new PostgresSaleRepository(executor);
    expect(typeof repo.create).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.listByCompany).toBe('function');
    expect(typeof repo.addSaleItem).toBe('function');
  });

  it('PaymentRepository should implement create, update, findById, listByCompany, createLink, getLinksBySale, removeLink', () => {
    const repo = new PostgresPaymentRepository(executor);
    expect(typeof repo.create).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.listByCompany).toBe('function');
    expect(typeof repo.createLink).toBe('function');
    expect(typeof repo.getLinksBySale).toBe('function');
    expect(typeof repo.removeLink).toBe('function');
  });

  it('CashSessionRepository should implement create, update, findById, findActiveSession, addMovement', () => {
    const repo = new PostgresCashSessionRepository(executor);
    expect(typeof repo.create).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.findActiveSession).toBe('function');
    expect(typeof repo.addMovement).toBe('function');
  });

  it('ExpenseRepository should implement create, update, findById, listByCompany, addAttachment', () => {
    const repo = new PostgresExpenseRepository(executor);
    expect(typeof repo.create).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.listByCompany).toBe('function');
    expect(typeof repo.addAttachment).toBe('function');
  });
});

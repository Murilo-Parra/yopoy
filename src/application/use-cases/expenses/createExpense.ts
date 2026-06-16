import { Expense } from '../../../domain/entities';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';
import { LedgerRepository } from '../../repositories/LedgerRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CreateExpenseInput {
  companyId: string;
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
}

export async function createExpense(
  input: CreateExpenseInput,
  expenseRepo: ExpenseRepository,
  ledgerRepo: LedgerRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<Expense>> {
  if (input.amount <= 0) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'Amount must be greater than zero'));
  }

  const expense: Expense = {
    id: randomUUID(),
    company_id: input.companyId,
    amount: input.amount,
    category: input.category,
    description: input.description,
    date: input.date,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId,
    version: 1
  };

  await expenseRepo.create(expense);

  await ledgerRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    account: 'EXPENSES',
    debit: 0,
    credit: input.amount,
    reference_id: expense.id,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  });

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'Expense',
    entity_id: expense.id,
    action: 'CREATE',
    current_state: JSON.stringify(expense),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(expense);
}

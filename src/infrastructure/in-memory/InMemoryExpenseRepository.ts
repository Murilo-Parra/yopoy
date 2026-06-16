import { Expense, Attachment } from '../../domain/entities';
import { ExpenseRepository } from '../../application/repositories/ExpenseRepository';

export class InMemoryExpenseRepository implements ExpenseRepository {
  private expenses: Expense[] = [];
  private attachments: Attachment[] = [];

  async create(expense: Expense): Promise<Expense> {
    this.expenses.push(expense);
    return expense;
  }

  async update(expense: Expense): Promise<Expense> {
    const index = this.expenses.findIndex(e => e.id === expense.id && e.company_id === expense.company_id);
    if (index >= 0) {
      this.expenses[index] = expense;
    }
    return expense;
  }

  async findById(companyId: string, id: string): Promise<Expense | null> {
    return this.expenses.find(e => e.id === id && e.company_id === companyId) || null;
  }

  async listByCompany(companyId: string): Promise<Expense[]> {
    return this.expenses.filter(e => e.company_id === companyId);
  }

  async addAttachment(attachment: Attachment): Promise<void> {
    this.attachments.push(attachment);
  }
}

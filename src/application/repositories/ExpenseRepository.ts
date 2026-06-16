import { Expense, Attachment } from '../../domain/entities';

export interface ExpenseRepository {
  create(expense: Expense): Promise<Expense>;
  update(expense: Expense): Promise<Expense>;
  findById(companyId: string, id: string): Promise<Expense | null>;
  listByCompany(companyId: string): Promise<Expense[]>;
  addAttachment(attachment: Attachment): Promise<void>;
}

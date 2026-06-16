import { Expense } from '../../../domain/entities';

export class ExpenseMapper {
  static toPersistence(domain: Expense) {
    return {
      id: domain.id,
      company_id: domain.company_id,
      amount: domain.amount,
      date: domain.date,
      category: domain.category,
      description: domain.description || null,
      status: domain.status,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
      created_by: domain.created_by,
      updated_by: domain.updated_by,
      archived_at: domain.archived_at,
      deleted_at: domain.deleted_at,
      version: domain.version
    };
  }
}

import { ExpenseRepository } from '../../../application/repositories/ExpenseRepository';
import { Expense } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';
import { ExpenseMapper } from '../mappers/expense.mapper';

export class PostgresExpenseRepository implements ExpenseRepository {
  constructor(private executor: SqlExecutor) {}

  async create(expense: Expense): Promise<Expense> {
    const row = ExpenseMapper.toPersistence(expense);
    await this.executor.execute({
      sql: `
        INSERT INTO expenses (
          id, company_id, amount, date, category, description, status,
          created_at, updated_at, created_by, updated_by, archived_at, deleted_at, version
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.amount, row.date, row.category, row.description, row.status,
        row.created_at, row.updated_at, row.created_by, row.updated_by, row.archived_at, row.deleted_at, row.version
      ],
      mode: 'dry-run',
      label: 'Create Expense'
    });
    return expense;
  }

  async update(expense: Expense): Promise<Expense> {
    const row = ExpenseMapper.toPersistence(expense);
    await this.executor.execute({
      sql: `
        UPDATE expenses SET
          amount = $3, date = $4, category = $5, description = $6, status = $7,
          updated_at = $8, updated_by = $9, version = $10
        WHERE id = $1 AND company_id = $2 AND deleted_at IS NULL
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.amount, row.date, row.category, row.description, row.status,
        row.updated_at, row.updated_by, row.version
      ],
      mode: 'dry-run',
      label: 'Update Expense'
    });
    return expense;
  }

  async findById(companyId: string, id: string): Promise<Expense | null> {
    await this.executor.execute({
      sql: `SELECT * FROM expenses WHERE company_id = $1 AND id = $2 AND deleted_at IS NULL -- DRY RUN ONLY`,
      params: [companyId, id],
      mode: 'dry-run',
      label: 'Find Expense By Id'
    });
    return null;
  }

  async listByCompany(companyId: string): Promise<Expense[]> {
    await this.executor.execute({
      sql: `SELECT * FROM expenses WHERE company_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC -- DRY RUN ONLY`,
      params: [companyId],
      mode: 'dry-run',
      label: 'List Expenses'
    });
    return [];
  }

  async addAttachment(attachment: any): Promise<void> {
    await this.executor.execute({
      sql: `INSERT INTO attachments (id, company_id, parent_id, url) VALUES ($1, $2, $3, $4) -- DRY RUN ONLY`,
      params: [attachment.id, attachment.company_id, attachment.parent_entity_id, attachment.url],
      mode: 'dry-run',
      label: 'Add Expense Attachment'
    });
  }
}

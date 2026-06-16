import { PaymentRepository } from '../../../application/repositories/PaymentRepository';
import { Payment, PaymentLink } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';
import { PaymentMapper } from '../mappers/payment.mapper';

export class PostgresPaymentRepository implements PaymentRepository {
  constructor(private executor: SqlExecutor) {}

  async create(payment: Payment): Promise<Payment> {
    const row = PaymentMapper.toPersistence(payment);
    await this.executor.execute({
      sql: `
        INSERT INTO payments (
          id, company_id, amount, method, status,
          created_at, updated_at, created_by, updated_by,
          archived_at, deleted_at, version
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.amount, row.method, row.status,
        row.created_at, row.updated_at, row.created_by, row.updated_by,
        row.archived_at, row.deleted_at, row.version
      ],
      mode: 'dry-run',
      label: 'Create Payment'
    });
    return payment;
  }

  async update(payment: Payment): Promise<Payment> {
    const row = PaymentMapper.toPersistence(payment);
    await this.executor.execute({
      sql: `
        UPDATE payments SET
          status = $3, updated_by = $4, updated_at = $5, version = $6
        WHERE id = $1 AND company_id = $2 AND deleted_at IS NULL
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.status, row.updated_by, row.updated_at, row.version
      ],
      mode: 'dry-run',
      label: 'Update Payment'
    });
    return payment;
  }

  async findById(companyId: string, id: string): Promise<Payment | null> {
    await this.executor.execute({
      sql: `SELECT * FROM payments WHERE company_id = $1 AND id = $2 AND deleted_at IS NULL -- DRY RUN ONLY`,
      params: [companyId, id],
      mode: 'dry-run',
      label: 'Find Payment By Id'
    });
    return null;
  }

  async listByCompany(companyId: string): Promise<Payment[]> {
    await this.executor.execute({
      sql: `SELECT * FROM payments WHERE company_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC -- DRY RUN ONLY`,
      params: [companyId],
      mode: 'dry-run',
      label: 'List Payments By Company'
    });
    return [];
  }

  async createLink(link: PaymentLink): Promise<PaymentLink> {
    const row = PaymentMapper.linkToPersistence(link, 'override_later'); 
    await this.executor.execute({
      sql: `
        INSERT INTO payment_links (
          id, payment_id, sale_id, assigned_amount, created_at, created_by
          -- Note: company_id is inferred or passed but in DTO it's needed
        ) VALUES (
          $1, $2, $3, $4, $5, $6
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.payment_id, row.sale_id, row.assigned_amount, row.created_at, row.created_by
      ],
      mode: 'dry-run',
      label: 'Create Payment Link'
    });
    return link;
  }

  async removeLink(linkId: string): Promise<void> {
    await this.executor.execute({
      sql: `DELETE FROM payment_links WHERE id = $1 -- DRY RUN ONLY`,
      params: [linkId],
      mode: 'dry-run',
      label: 'Remove Payment Link'
    });
  }

  async getLinksBySale(companyId: string, saleId: string): Promise<PaymentLink[]> {
    await this.executor.execute({
      sql: `
        SELECT pl.* FROM payment_links pl
        JOIN sales s ON s.id = pl.sale_id
        WHERE s.company_id = $1 AND pl.sale_id = $2
        -- DRY RUN ONLY
      `,
      params: [companyId, saleId],
      mode: 'dry-run',
      label: 'Get Payment Links By Sale'
    });
    return [];
  }
}

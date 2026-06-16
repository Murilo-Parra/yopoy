import { SaleRepository } from '../../../application/repositories/SaleRepository';
import { Sale, SaleItem } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';
import { SaleMapper } from '../mappers/sale.mapper';

export class PostgresSaleRepository implements SaleRepository {
  constructor(private executor: SqlExecutor) {}

  async create(sale: Sale): Promise<Sale> {
    const row = SaleMapper.toPersistence(sale);
    
    await this.executor.execute({
      sql: `
        INSERT INTO sales (
          id, company_id, customer_id, status, total_amount, discount_amount,
          created_by, updated_by, created_at, updated_at, 
          archived_at, archived_by, deleted_at, deleted_by, version
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )
        -- DRY RUN ONLY — DO NOT EXECUTE
      `,
      params: [
        row.id, row.company_id, row.customer_id, row.status, row.total_amount, row.discount_amount,
        row.created_by, row.updated_by, row.created_at, row.updated_at,
        row.archived_at, row.archived_by, row.deleted_at, row.deleted_by, row.version
      ],
      mode: 'dry-run',
      label: 'Create Sale'
    });

    return sale;
  }

  async update(sale: Sale): Promise<Sale> {
    const row = SaleMapper.toPersistence(sale);
    
    await this.executor.execute({
      sql: `
        UPDATE sales SET 
          customer_id = $3, status = $4, total_amount = $5, discount_amount = $6,
          updated_by = $7, updated_at = $8, version = $9
        WHERE id = $1 AND company_id = $2 AND deleted_at IS NULL
        -- DRY RUN ONLY — DO NOT EXECUTE
      `,
      params: [
        row.id, row.company_id, row.customer_id, row.status, row.total_amount, row.discount_amount,
        row.updated_by, row.updated_at, row.version
      ],
      mode: 'dry-run',
      label: 'Update Sale'
    });

    return sale;
  }

  async findById(companyId: string, id: string): Promise<Sale | null> {
    await this.executor.execute({
      sql: `
        SELECT * FROM sales
        WHERE company_id = $1 AND id = $2 AND deleted_at IS NULL
        -- DRY RUN ONLY — DO NOT EXECUTE
      `,
      params: [companyId, id],
      mode: 'dry-run',
      label: 'Find Sale By Id'
    });

    return null; // Dry run mostly returns null or mocked
  }

  async listByCompany(companyId: string): Promise<Sale[]> {
    await this.executor.execute({
      sql: `
        SELECT * FROM sales
        WHERE company_id = $1 AND deleted_at IS NULL
        ORDER BY created_at DESC
        -- DRY RUN ONLY — DO NOT EXECUTE
      `,
      params: [companyId],
      mode: 'dry-run',
      label: 'List Sales By Company'
    });

    return [];
  }

  async addSaleItem(companyId: string, saleId: string, item: SaleItem): Promise<void> {
    const row = SaleMapper.itemToPersistence(item, companyId);
    
    await this.executor.execute({
      sql: `
        INSERT INTO sale_items (
          id, company_id, sale_id, product_id, service_id,
          qty, unit_value, total_value
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
        -- DRY RUN ONLY — DO NOT EXECUTE
      `,
      params: [
        row.id, row.company_id, row.sale_id, row.product_id, row.service_id,
        row.qty, row.unit_value, row.total_value
      ],
      mode: 'dry-run',
      label: 'Add Sale Item'
    });
  }
}

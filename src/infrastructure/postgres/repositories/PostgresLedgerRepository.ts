import { LedgerRepository } from '../../../application/repositories/LedgerRepository';
import { LedgerEntry } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';
import { LedgerMapper } from '../mappers/ledger.mapper';

export class PostgresLedgerRepository implements LedgerRepository {
  constructor(private executor: SqlExecutor) {}

  async create(entry: LedgerEntry): Promise<LedgerEntry> {
    const row = LedgerMapper.toPersistence(entry);
    await this.executor.execute({
      sql: `
        INSERT INTO ledger_entries (
          id, company_id, account, debit, credit, reference_id, status,
          created_at, updated_at, created_by, updated_by
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.account, row.debit, row.credit, row.reference_id, row.status,
        row.created_at, row.updated_at, row.created_by, row.updated_by
      ],
      mode: 'dry-run',
      label: 'Create LedgerEntry'
    });
    return entry;
  }

  async listByCompany(companyId: string): Promise<LedgerEntry[]> {
    await this.executor.execute({
      sql: `SELECT * FROM ledger_entries WHERE company_id = $1 ORDER BY created_at DESC -- DRY RUN ONLY`,
      params: [companyId],
      mode: 'dry-run',
      label: 'List LedgerEntries'
    });
    return [];
  }
}

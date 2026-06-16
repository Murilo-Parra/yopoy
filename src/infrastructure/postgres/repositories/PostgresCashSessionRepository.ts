import { CashSessionRepository } from '../../../application/repositories/CashSessionRepository';
import { CashSession, CashMovement } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';
import { CashMapper } from '../mappers/cash.mapper';

export class PostgresCashSessionRepository implements CashSessionRepository {
  constructor(private executor: SqlExecutor) {}

  async create(session: CashSession): Promise<CashSession> {
    const row = CashMapper.toPersistence(session);
    await this.executor.execute({
      sql: `
        INSERT INTO cash_sessions (
          id, company_id, opened_at, initial_balance, status,
          created_at, updated_at, created_by, updated_by
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.opened_at, row.initial_balance, row.status,
        row.created_at, row.updated_at, row.created_by, row.updated_by
      ],
      mode: 'dry-run',
      label: 'Create CashSession'
    });
    return session;
  }

  async close(session: CashSession): Promise<CashSession> {
    const row = CashMapper.toPersistence(session);
    await this.executor.execute({
      sql: `
        UPDATE cash_sessions SET
          closed_at = $3, final_balance = $4, status = $5,
          updated_by = $6, updated_at = $7
        WHERE id = $1 AND company_id = $2
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.closed_at, row.final_balance, row.status,
        row.updated_by, row.updated_at
      ],
      mode: 'dry-run',
      label: 'Close CashSession'
    });
    return session;
  }

  async update(session: CashSession): Promise<CashSession> {
    return this.close(session);
  }

  async findById(companyId: string, id: string): Promise<CashSession | null> {
    await this.executor.execute({
      sql: `SELECT * FROM cash_sessions WHERE company_id = $1 AND id = $2 -- DRY RUN ONLY`,
      params: [companyId, id],
      mode: 'dry-run',
      label: 'Find CashSession By Id'
    });
    return null;
  }

  async findActiveSession(companyId: string): Promise<CashSession | null> {
    await this.executor.execute({
      sql: `SELECT * FROM cash_sessions WHERE company_id = $1 AND status = 'OPEN' ORDER BY created_at DESC LIMIT 1 -- DRY RUN ONLY`,
      params: [companyId],
      mode: 'dry-run',
      label: 'Find Active CashSession'
    });
    return null;
  }

  async findActiveByUserId(companyId: string, userId: string): Promise<CashSession | null> {
    await this.executor.execute({
      sql: `SELECT * FROM cash_sessions WHERE company_id = $1 AND created_by = $2 AND status = 'OPEN' -- DRY RUN ONLY`,
      params: [companyId, userId],
      mode: 'dry-run',
      label: 'Find Active CashSession'
    });
    return null;
  }

  async addMovement(movement: CashMovement): Promise<void> {
    const row = CashMapper.movementToPersistence(movement, movement.session_id); // companyId isn't on CashMovement directly? 
    await this.executor.execute({
      sql: `
        INSERT INTO cash_movements (
          id, company_id, session_id, type, amount, notes, created_at, created_by
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.session_id, row.type, row.amount, row.notes, row.created_at, row.created_by
      ],
      mode: 'dry-run',
      label: 'Add Cash Movement'
    });
  }

  async listMovements(companyId: string, sessionId: string): Promise<CashMovement[]> {
    await this.executor.execute({
      sql: `SELECT * FROM cash_movements WHERE company_id = $1 AND session_id = $2 ORDER BY created_at DESC -- DRY RUN ONLY`,
      params: [companyId, sessionId],
      mode: 'dry-run',
      label: 'List Cash Movements'
    });
    return [];
  }
}

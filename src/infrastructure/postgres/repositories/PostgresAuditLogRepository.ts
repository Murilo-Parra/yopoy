import { AuditLogRepository } from '../../../application/repositories/AuditLogRepository';
import { AuditLog } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';
import { AuditMapper } from '../mappers/audit.mapper';

export class PostgresAuditLogRepository implements AuditLogRepository {
  constructor(private executor: SqlExecutor) {}

  async create(log: AuditLog): Promise<AuditLog> {
    const row = AuditMapper.toPersistence(log);
    
    await this.executor.execute({
      sql: `
        INSERT INTO audit_logs (
          id, company_id, entity_type, entity_id, action,
          previous_state, current_state, user_id, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
        -- DRY RUN ONLY
      `,
      params: [
        row.id, row.company_id, row.entity_type, row.entity_id, row.action,
        JSON.stringify(row.previous_state), JSON.stringify(row.current_state), row.user_id, row.created_at
      ],
      mode: 'dry-run',
      label: 'Create AuditLog'
    });

    return log;
  }

  async listByCompany(companyId: string): Promise<AuditLog[]> {
    await this.executor.execute({
      sql: `
        SELECT * FROM audit_logs 
        WHERE company_id = $1 
        ORDER BY created_at DESC 
        -- DRY RUN ONLY
      `,
      params: [companyId],
      mode: 'dry-run',
      label: 'List AuditLogs By Company'
    });
    return [];
  }
}

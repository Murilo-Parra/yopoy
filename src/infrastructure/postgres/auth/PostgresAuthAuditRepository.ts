import { AuthAuditRepository } from '../../../application/auth/contracts/AuthAuditRepository';
import { AuthAuditEvent } from '../../../application/auth/types';
import { SqlExecutor } from '../executor/SqlExecutor';
import { sanitizeAuthAuditMetadata } from '../../../application/auth/sanitizeAuthAuditMetadata';

export class PostgresAuthAuditRepository implements AuthAuditRepository {
  constructor(private executor: SqlExecutor) {}

  async recordAuthEvent(event: Omit<AuthAuditEvent, 'id' | 'timestamp'>): Promise<AuthAuditEvent> {
    const success = !['login_failed', 'user_locked', 'permission_denied'].includes(event.eventType);
    
    let companyId = event.companyId;
    if (!companyId) {
      const companyIdRes = await this.executor.execute<any[]>({
        sql: "SELECT current_setting('app.current_company_id', true) as company_id",
        mode: 'real',
        label: 'getCurrentCompanyId'
      });
      companyId = companyIdRes[0]?.company_id || null;
    }

    if (companyId) {
      await this.executor.execute({
        sql: `SELECT set_config('app.current_company_id', $1, true)`,
        params: [companyId],
        mode: 'real',
        label: 'setCompanyContext'
      });
    }

    const rawMetadata = {
      ipAddress: event.ipAddress,
      userAgent: event.userAgent
    };
    const sanitizedMetadata = sanitizeAuthAuditMetadata(rawMetadata);

    const rows = await this.executor.execute<any[]>({
      sql: `
        INSERT INTO auth_audit_logs (
          company_id, user_id, event_type, success, reason, metadata_json, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, NOW()
        ) RETURNING *;
      `,
      params: [
        companyId,
        event.userId,
        event.eventType,
        success,
        event.description,
        JSON.stringify(sanitizedMetadata)
      ],
      mode: 'real',
      label: 'recordAuthEvent'
    });

    const row = rows[0];
    return {
      id: row.id,
      companyId: row.company_id,
      userId: row.user_id,
      eventType: row.event_type as any,
      description: row.reason || '',
      ipAddress: row.metadata_json?.ipAddress || null,
      userAgent: row.metadata_json?.userAgent || null,
      timestamp: new Date(row.created_at)
    };
  }

  async listAuthEventsByCompany(companyId: string): Promise<AuthAuditEvent[]> {
    await this.executor.execute({
      sql: `SELECT set_config('app.current_company_id', $1, true)`,
      params: [companyId],
      mode: 'real',
      label: 'setCompanyContext'
    });

    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM auth_audit_logs WHERE company_id = $1 ORDER BY created_at DESC',
      params: [companyId],
      mode: 'real',
      label: 'listAuthEventsByCompany'
    });

    return rows.map(row => ({
      id: row.id,
      companyId: row.company_id,
      userId: row.user_id,
      eventType: row.event_type as any,
      description: row.reason || '',
      ipAddress: row.metadata_json?.ipAddress || null,
      userAgent: row.metadata_json?.userAgent || null,
      timestamp: new Date(row.created_at)
    }));
  }
}

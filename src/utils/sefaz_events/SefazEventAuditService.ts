import { pgPool, isPostgresActive } from '../../../db';

export class SefazEventAuditService {
  /**
   * Registra uma ação de auditoria de eventos SEFAZ
   */
  public static async logAction(
    companyId: string,
    action: string,
    details: any,
    createdBy: string = "system",
    eventId?: string,
    documentId?: string
  ): Promise<void> {
    const detailsStr = typeof details === 'string' ? details : JSON.stringify(details);

    if (isPostgresActive && pgPool) {
      try {
        await pgPool.query(`
          INSERT INTO sefaz_event_logs (company_id, event_id, document_id, action, details, created_by)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [companyId, eventId, documentId, action, detailsStr, createdBy]);
      } catch (err) {
        console.error("Erro ao salvar log de auditoria de evento:", err);
      }
    } else {
      console.log(`[Audit Local] ${action} | ${companyId} | ${detailsStr}`);
    }
  }

  /**
   * Obtém os logs de auditoria
   */
  public static async getLogs(companyId: string, limit: number = 100): Promise<any[]> {
    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(`
          SELECT * FROM sefaz_event_logs 
          WHERE company_id = $1 
          ORDER BY created_at DESC 
          LIMIT $2
        `, [companyId, limit]);
        return res.rows;
      } catch (err) {
        console.error("Erro ao ler logs:", err);
        return [];
      }
    }
    return [];
  }
}

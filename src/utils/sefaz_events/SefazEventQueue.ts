import { pgPool, isPostgresActive } from '../../../db';
import { v4 as uuidv4 } from 'uuid';
import { SefazEventAuditService } from './SefazEventAuditService';

export interface SefazEventJob {
  id: string;
  company_id: string;
  document_id?: string;
  event_type: string;
  payload: any;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  retry_count: number;
  error_message?: string;
}

export class SefazEventQueue {
  /**
   * Adiciona um evento à fila para processamento assíncrono
   */
  public static async enqueue(
    companyId: string,
    eventType: string,
    payload: any,
    documentId?: string
  ): Promise<string> {
    const id = uuidv4();

    if (isPostgresActive && pgPool) {
      try {
        await pgPool.query(`
          INSERT INTO sefaz_event_queue (id, company_id, document_id, event_type, payload, status)
          VALUES ($1, $2, $3, $4, $5, 'PENDING')
        `, [id, companyId, documentId, eventType, JSON.stringify(payload)]);
        
        await SefazEventAuditService.logAction(companyId, "ENQUEUE_EVENT", { event_type: eventType }, "system", id, documentId);
        return id;
      } catch (err) {
        console.error("Erro ao enfileirar evento:", err);
        throw err;
      }
    } else {
      console.warn("Postgres inativo. O evento não foi enfileirado.");
      return id;
    }
  }

  /**
   * Obtém os próximos eventos pendentes
   */
  public static async getPending(limit = 10): Promise<SefazEventJob[]> {
    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(`
          SELECT * FROM sefaz_event_queue 
          WHERE status = 'PENDING' OR (status = 'FAILED' AND retry_count < 3 AND next_retry_at <= NOW())
          ORDER BY created_at ASC 
          LIMIT $1
        `, [limit]);
        return res.rows;
      } catch (err) {
        console.error("Erro ao ler fila pendente:", err);
        return [];
      }
    }
    return [];
  }

  /**
   * Atualiza o status do evento na fila
   */
  public static async updateStatus(id: string, status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED', errorMsg?: string, nextRetryAt?: Date): Promise<void> {
    if (isPostgresActive && pgPool) {
      try {
        let query = `UPDATE sefaz_event_queue SET status = $1, error_message = $2, updated_at = NOW()`;
        const params: any[] = [status, errorMsg || null];
        
        if (status === 'FAILED') {
          query += `, retry_count = retry_count + 1`;
          if (nextRetryAt) {
             query += `, next_retry_at = $3`;
             params.push(nextRetryAt);
          }
        }
        query += ` WHERE id = ${params.push(id) ? '$'+params.length : ''}`;
        
        await pgPool.query(query, params);
      } catch (err) {
        console.error("Erro ao atualizar status da fila:", err);
      }
    }
  }
}

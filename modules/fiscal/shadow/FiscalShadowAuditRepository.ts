import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { FiscalShadowAuditRecord, FiscalShadowAuditResult } from "./FiscalShadowAuditTypes";
import { randomUUID } from "crypto";

export class FiscalShadowAuditRepository {
  public async save(record: FiscalShadowAuditRecord): Promise<FiscalShadowAuditResult> {
    if (!isPostgresActive || !pgPool) {
      return { success: true, persisted: false, skippedReason: "Postgres inativo" };
    }

    if (record.source !== "fiscal-v2-shadow") {
      return { success: false, persisted: false, skippedReason: "Origem inválida" };
    }

    const id = randomUUID();

    try {
      await pgPool.query(
        `INSERT INTO shadow_divergence_logs (
          id, company_id, user_id, request_id, 
          route, operation, severity, matched, 
          difference_count, warning_count, duration_ms, 
          summary, fields, source, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          id,
          record.companyId,
          record.userId || null,
          record.requestId || null,
          record.route,
          record.operation,
          record.severity || null,
          record.matched,
          record.differenceCount,
          record.warningCount,
          record.durationMs,
          record.summary,
          record.fields,
          record.source,
          new Date(record.createdAt || Date.now()).toISOString()
        ]
      );

      return { success: true, persisted: true, recordId: id };
    } catch (err: any) {
      console.error("[FISCAL_SHADOW_AUDIT_REPO] Falha ao salvar log de divergência:", err.message);
      // Retornar success: false sem disparar exceção que fure o shadow router
      return { success: false, persisted: false, skippedReason: err.message };
    }
  }

  public async listByCompany(companyId: string, limit: number = 50): Promise<any[]> {
    if (!isPostgresActive || !pgPool) return [];
    try {
      const res = await pgPool.query(
        `SELECT * FROM shadow_divergence_logs WHERE company_id = $1 ORDER BY created_at DESC LIMIT $2`,
        [companyId, limit]
      );
      return res.rows;
    } catch(err: any) {
      console.error("[FISCAL_SHADOW_AUDIT_REPO] Falha ao listar logs de divergência:", err.message);
      return [];
    }
  }

  public async cleanupOld(companyId: string, olderThanDays: number): Promise<void> {
    if (!isPostgresActive || !pgPool) return;
    try {
      await pgPool.query(
        `DELETE FROM shadow_divergence_logs 
         WHERE company_id = $1 AND created_at < NOW() - INTERVAL '${olderThanDays} days'`,
        [companyId]
      );
    } catch (err: any) {
      console.error("[FISCAL_SHADOW_AUDIT_REPO] Falha no cleanup:", err.message);
    }
  }
}

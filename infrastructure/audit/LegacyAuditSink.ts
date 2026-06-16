import { AuditSink, AuditEvent } from "../../shared/audit";
import { logAudit } from "../../db";

export class LegacyAuditSink implements AuditSink {
  /**
   * Adapts modern AuditEvents for execution in the legacy logAudit DB routine
   */
  public async write(event: AuditEvent): Promise<void> {
    const obj = event.toObject();
    const meta = obj.metadata || {};
    const companyId = meta.companyId || null;
    const userId = meta.userId || null;
    const ip = meta.ip || '127.0.0.1';
    
    try {
      const dbDetails = `${obj.message}${obj.details ? ' | Details: ' + JSON.stringify(obj.details) : ''}`;
      await logAudit(companyId, userId, obj.action, dbDetails, ip);
    } catch (err) {
      console.error("[LegacyAuditSink] logAudit write failed:", err);
    }
  }
}

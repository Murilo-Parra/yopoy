import { FiscalShadowProxyComparisonResult, FiscalShadowProxyDispatchResult } from "./FiscalShadowProxyTypes";
import { pgPool } from "../../../../infrastructure/database/pgPooler";
import { FiscalSafeAuditSerializer } from "./FiscalSafeAuditSerializer";
import * as crypto from "crypto";

export class FiscalShadowProxyAuditService {
  private serializer = new FiscalSafeAuditSerializer();

  public async logSimulatedDispatch(
    route: string, 
    operation: string, 
    decision: FiscalShadowProxyDispatchResult,
    comparison: FiscalShadowProxyComparisonResult | undefined,
    companyId?: string, 
    userId?: string
  ): Promise<void> {
    if (pgPool) {
      try {
         const serialized = this.serializer.serializeForAudit(route, operation, decision, comparison);
         
         const query = `
           INSERT INTO canary_control_records 
           (id, company_id, user_id, action, route, operation, risk_level, status, mode, simulation_only, activation_blocked, reason, metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         `;
         const metaStr = JSON.stringify(serialized.metadata);
         const id = crypto.randomUUID();

         let finalReason = "Simulação de Shadow Proxy executada no Harness.";
         let finalStatus = "SIMULATION_RECORDED";
         if (!serialized.valid) {
             finalReason = "AUDIT_BLOCKED: " + serialized.skippedReason;
             finalStatus = "AUDIT_BLOCKED";
         }

         const vals = [
           id, companyId || null, userId || null, 'SHADOW_PROXY_SIMULATED', route, operation || 'UNKNOWN', comparison?.severity || 'LOW', finalStatus, 'SIMULATION_ONLY', true, true, finalReason, metaStr
         ];
         await pgPool.query(query, vals);
      } catch (e: any) {
         console.warn("FiscalShadowProxyAuditService error:", e.message);
      }
    }
  }
}

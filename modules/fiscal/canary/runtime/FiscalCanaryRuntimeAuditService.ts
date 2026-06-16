import { FiscalCanaryRuntimeAuditRecord, FiscalCanaryRuntimeDecision } from "./FiscalCanaryRuntimeTypes";
import { pgPool } from "../../../../infrastructure/database/pgPooler";
import * as crypto from "crypto";

export class FiscalCanaryRuntimeAuditService {
  public async recordDecision(route: string, operation: string, decision: FiscalCanaryRuntimeDecision, companyId?: string, userId?: string): Promise<void> {
    if (pgPool) {
      try {
         const query = `
           INSERT INTO canary_control_records 
           (id, company_id, user_id, action, route, operation, risk_level, status, mode, simulation_only, activation_blocked, reason, metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         `;
         const meta = JSON.stringify({
            blockers: decision.blockers,
            warnings: decision.warnings,
            routeToV2: decision.routeToV2,
            routeToLegacy: decision.routeToLegacy,
            canaryActive: decision.canaryActive
         });
         const id = crypto.randomUUID();
         const vals = [
           id, companyId || null, userId || null, 'RUNTIME_DECISION_SIMULATED', route, operation, 'LOW', 'SIMULATION_APPROVED', 'SIMULATION_ONLY', true, true, decision.reason, meta
         ];
         await pgPool.query(query, vals);
      } catch (e: any) {
         console.warn("FiscalCanaryRuntimeAuditService error:", e.message);
      }
    }
  }
}

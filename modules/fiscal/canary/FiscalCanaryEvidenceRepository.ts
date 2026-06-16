import { pgPool } from "../../../infrastructure/database/pgPooler";
import { FiscalCanaryEvidenceSummary, FiscalCanaryEvidenceStatus } from "./FiscalCanaryEvidenceTypes";

export class FiscalCanaryEvidenceRepository {
  public async getEvidenceSummary(route: string, operation: string, companyId?: string): Promise<FiscalCanaryEvidenceSummary> {
    if (!pgPool) {
      return this.buildUnknown(route, operation, companyId);
    }

    try {
      let query = `
        SELECT 
          COUNT(*) as total_runs,
          SUM(CASE WHEN is_match = true THEN 1 ELSE 0 END) as matched_count,
          SUM(CASE WHEN is_match = false THEN 1 ELSE 0 END) as diverged_count,
          SUM(CASE WHEN severity = 'BLOCKER' THEN 1 ELSE 0 END) as blocker_count,
          SUM(CASE WHEN severity = 'HIGH' THEN 1 ELSE 0 END) as high_count,
          SUM(CASE WHEN severity = 'MEDIUM' THEN 1 ELSE 0 END) as medium_count,
          SUM(CASE WHEN severity = 'LOW' THEN 1 ELSE 0 END) as low_count,
          SUM(CASE WHEN status_code_v1 >= 500 OR status_code_v2 >= 500 THEN 1 ELSE 0 END) as failed_count
        FROM shadow_divergence_logs
        WHERE route = $1
      `;
      const values: any[] = [route];
      
      let i = 2;
      if (companyId) {
        query += ` AND company_id = $${i}`;
        values.push(companyId);
      }

      const res = await pgPool.query(query, values);
      const row = res.rows[0];

      const total = parseInt(row.total_runs || "0");
      const matched = parseInt(row.matched_count || "0");
      const diverged = parseInt(row.diverged_count || "0");
      const blockers = parseInt(row.blocker_count || "0");
      const highs = parseInt(row.high_count || "0");
      const failed = parseInt(row.failed_count || "0");

      const score = total > 0 ? (matched / total) * 100 : 0;

      return {
        companyId,
        route,
        operation,
        sampleSize: total,
        matchedCount: matched,
        divergedCount: diverged,
        failedCount: failed,
        blockerCount: blockers,
        highCount: highs,
        mediumCount: parseInt(row.medium_count || "0"),
        lowCount: parseInt(row.low_count || "0"),
        readinessScore: score,
        evidenceStatus: FiscalCanaryEvidenceStatus.UNKNOWN,
        simulationOnly: true,
        activationBlocked: true,
        generatedAt: new Date().toISOString()
      };
    } catch (e: any) {
      console.warn("FiscalCanaryEvidenceRepository.getEvidenceSummary err:", e.message);
      return this.buildUnknown(route, operation, companyId);
    }
  }

  private buildUnknown(route: string, operation: string, companyId?: string): FiscalCanaryEvidenceSummary {
    return {
      companyId,
      route,
      operation,
      sampleSize: 0,
      matchedCount: 0,
      divergedCount: 0,
      failedCount: 0,
      blockerCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      readinessScore: 0,
      evidenceStatus: FiscalCanaryEvidenceStatus.UNKNOWN,
      simulationOnly: true,
      activationBlocked: true,
      generatedAt: new Date().toISOString()
    };
  }
}

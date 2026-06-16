import { pgPool } from "../../../infrastructure/database/pgPooler";

export class FiscalCanaryCockpitReadModel {
  public async getAggregatedShadowMetrics(companyId?: string): Promise<{ totalRuns: number, totalDivergences: number, blockers: number, highs: number, score: number }> {
     if (!pgPool) return { totalRuns: 0, totalDivergences: 0, blockers: 0, highs: 0, score: 0 };
     try {
       let query = `
         SELECT 
           COUNT(*) as runs,
           SUM(CASE WHEN is_match = false THEN 1 ELSE 0 END) as diverged,
           SUM(CASE WHEN severity = 'BLOCKER' THEN 1 ELSE 0 END) as blockers,
           SUM(CASE WHEN severity = 'HIGH' THEN 1 ELSE 0 END) as highs,
           SUM(CASE WHEN is_match = true THEN 1 ELSE 0 END) as matched
         FROM shadow_divergence_logs
         WHERE 1=1
       `;
       const values: any[] = [];
       if (companyId) {
         query += ` AND company_id = $1`;
         values.push(companyId);
       }
       const res = await pgPool.query(query, values);
       const row = res.rows[0];
       const r = parseInt(row.runs || "0");
       const matched = parseInt(row.matched || "0");
       return {
         totalRuns: r,
         totalDivergences: parseInt(row.diverged || "0"),
         blockers: parseInt(row.blockers || "0"),
         highs: parseInt(row.highs || "0"),
         score: r > 0 ? (matched / r) * 100 : 0
       };
     } catch (e: any) {
        console.warn("CockpitReadModel.getAggregatedShadowMetrics err:", e.message);
        return { totalRuns: 0, totalDivergences: 0, blockers: 0, highs: 0, score: 0 };
     }
  }

  public async getAggregatedControlMetrics(companyId?: string): Promise<{ total: number, allowlists: number, approvals: number, blocked: number }> {
    if (!pgPool) return { total: 0, allowlists: 0, approvals: 0, blocked: 0 };
    try {
      let query = `
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN action = 'ALLOWLIST_SIMULATED' THEN 1 ELSE 0 END) as allowlists,
          SUM(CASE WHEN action = 'APPROVAL_SIMULATED' THEN 1 ELSE 0 END) as approvals,
          SUM(CASE WHEN status = 'BLOCKED' THEN 1 ELSE 0 END) as blocked
        FROM canary_control_records
        WHERE 1=1
      `;
      const values: any[] = [];
      if (companyId) {
        query += ` AND company_id = $1`;
        values.push(companyId);
      }
      const res = await pgPool.query(query, values);
      const row = res.rows[0];
      return {
        total: parseInt(row.total || "0"),
        allowlists: parseInt(row.allowlists || "0"),
        approvals: parseInt(row.approvals || "0"),
        blocked: parseInt(row.blocked || "0")
      };
    } catch (e: any) {
       console.warn("CockpitReadModel.getAggregatedControlMetrics err:", e.message);
       return { total: 0, allowlists: 0, approvals: 0, blocked: 0 };
    }
  }

  public async getBlockers(companyId?: string): Promise<any[]> {
    if (!pgPool) return [];
    try {
      let query = `
        SELECT route, operation, severity, mismatch_reason as reason, created_at, 'SHADOW_AUDIT' as source
        FROM shadow_divergence_logs
        WHERE severity = 'BLOCKER'
      `;
      const values: any[] = [];
      if (companyId) {
        query += ` AND company_id = $1`;
        values.push(companyId);
      }
      query += ` ORDER BY created_at DESC LIMIT 50`;
      
      const res = await pgPool.query(query, values);
      return res.rows;
    } catch (e: any) {
      console.warn("CockpitReadModel.getBlockers err:", e.message);
      return [];
    }
  }
}

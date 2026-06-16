import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { ShadowDashboardFiltersDTO, ShadowDivergenceListItemDTO } from "../dto/ShadowDashboardDTOs";

export class FiscalShadowReadModel {
  public async getSummary(filters: ShadowDashboardFiltersDTO): Promise<any> {
    if (!isPostgresActive || !pgPool) return this.emptySummary();

    const { whereClause, params } = this.buildWhere(filters);
    
    try {
      const sql = `
        SELECT 
          COUNT(*) as total_runs,
          SUM(CASE WHEN matched THEN 1 ELSE 0 END) as total_matched,
          SUM(CASE WHEN NOT matched THEN 1 ELSE 0 END) as total_diverged,
          severity,
          operation,
          route
        FROM shadow_divergence_logs
        ${whereClause}
        GROUP BY severity, operation, route
      `;
      
      const res = await pgPool.query(sql, params);
      
      const summary = {
        totalRuns: 0,
        totalMatched: 0,
        totalDiverged: 0,
        totalBySeverity: {} as Record<string, number>,
        totalByOperation: {} as Record<string, number>,
        totalByRoute: {} as Record<string, number>
      };

      for (const row of res.rows) {
        summary.totalRuns += parseInt(row.total_runs || "0");
        summary.totalMatched += parseInt(row.total_matched || "0");
        summary.totalDiverged += parseInt(row.total_diverged || "0");
        
        if (row.severity) {
          summary.totalBySeverity[row.severity] = (summary.totalBySeverity[row.severity] || 0) + parseInt(row.total_runs || "0");
        }
        if (row.operation) {
          summary.totalByOperation[row.operation] = (summary.totalByOperation[row.operation] || 0) + parseInt(row.total_runs || "0");
        }
        if (row.route) {
          summary.totalByRoute[row.route] = (summary.totalByRoute[row.route] || 0) + parseInt(row.total_runs || "0");
        }
      }

      return summary;
    } catch (err: any) {
      console.error("[FISCAL_SHADOW_READ] Erro ao buscar summary:", err.message);
      return this.emptySummary();
    }
  }

  public async listDivergences(filters: ShadowDashboardFiltersDTO): Promise<ShadowDivergenceListItemDTO[]> {
    if (!isPostgresActive || !pgPool) return [];

    const { whereClause, params } = this.buildWhere(filters);
    const limit = filters.limit || 50;
    const offset = filters.offset || 0;
    
    try {
      params.push(limit);
      params.push(offset);
      const sql = `
        SELECT id, company_id, route, operation, severity, matched, difference_count, warning_count, duration_ms, summary, fields, created_at
        FROM shadow_divergence_logs
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT $${params.length - 1} OFFSET $${params.length}
      `;
      
      const res = await pgPool.query(sql, params);
      
      return res.rows.map(row => ({
        id: row.id,
        companyIdMasked: this.maskCompanyId(row.company_id),
        route: row.route,
        operation: row.operation,
        severity: row.severity,
        matched: row.matched,
        differenceCount: row.difference_count,
        warningCount: row.warning_count,
        durationMs: row.duration_ms,
        summary: row.summary,
        fields: typeof row.fields === "string" ? JSON.parse(row.fields) : row.fields,
        createdAt: row.created_at
      }));
    } catch (err: any) {
      console.error("[FISCAL_SHADOW_READ] Erro ao listar divergencias:", err.message);
      return [];
    }
  }

  private buildWhere(filters: ShadowDashboardFiltersDTO): { whereClause: string, params: any[] } {
    const conditions: string[] = [];
    const params: any[] = [];
    let idx = 1;

    if (filters.companyId) {
      conditions.push(`company_id = $${idx++}`);
      params.push(filters.companyId);
    }
    if (filters.route) {
      conditions.push(`route = $${idx++}`);
      params.push(filters.route);
    }
    if (filters.operation) {
      conditions.push(`operation = $${idx++}`);
      params.push(filters.operation);
    }
    if (filters.severity) {
      conditions.push(`severity = $${idx++}`);
      params.push(filters.severity);
    }
    if (filters.matched !== undefined) {
      conditions.push(`matched = $${idx++}`);
      params.push(filters.matched);
    }
    if (filters.dateFrom) {
      conditions.push(`created_at >= $${idx++}`);
      params.push(new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      conditions.push(`created_at <= $${idx++}`);
      params.push(new Date(filters.dateTo));
    }

    const whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
    return { whereClause, params };
  }

  private maskCompanyId(companyId: string): string {
    if (!companyId) return "***";
    const head = companyId.substring(0, 4);
    const tail = companyId.substring(companyId.length - 4);
    return `${head}****${tail}`;
  }

  private emptySummary() {
    return {
      totalRuns: 0,
      totalMatched: 0,
      totalDiverged: 0,
      totalFailed: 0,
      totalBySeverity: {},
      totalByOperation: {},
      totalByRoute: {}
    };
  }
}

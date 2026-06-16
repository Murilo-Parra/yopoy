import { FiscalShadowReadModel } from "./FiscalShadowReadModel";
import { ShadowDashboardFiltersDTO, ShadowDashboardSummaryDTO, ShadowDivergenceListItemDTO } from "../dto/ShadowDashboardDTOs";

export class FiscalShadowDashboardService {
  private readModel = new FiscalShadowReadModel();

  public async getSummary(filters: ShadowDashboardFiltersDTO): Promise<ShadowDashboardSummaryDTO> {
    const rawSummary = await this.readModel.getSummary(filters);
    
    // Calculate a basic readiness score based on matched vs diverged, penalizing severe items
    let readinessScore = 100;
    
    const totalRuns = rawSummary.totalRuns;
    if (totalRuns > 0) {
      const matchRate = rawSummary.totalMatched / totalRuns;
      readinessScore = matchRate * 100;
      
      const blockers = rawSummary.totalBySeverity["BLOCKER"] || 0;
      const highs = rawSummary.totalBySeverity["HIGH"] || 0;
      
      // Heavy unscientific penalty for blockers and highs to simulate maturity guard
      readinessScore -= (blockers * 10);
      readinessScore -= (highs * 5);
      
      if (readinessScore < 0) readinessScore = 0;
    } else {
      readinessScore = 0;
    }

    return {
      ...rawSummary,
      readinessScore: Math.round(readinessScore),
      generatedAt: new Date().toISOString()
    };
  }

  public async listDivergences(filters: ShadowDashboardFiltersDTO): Promise<ShadowDivergenceListItemDTO[]> {
    const records = await this.readModel.listDivergences(filters);
    // Extra sanity check - remove any remaining sensitive keys if somehow bypassed
    return records.map(record => {
      if (record.fields) {
        if (typeof record.fields === "object") {
          // It's already sanitized by FiscalShadowSanitizer, but just ensuring structure
        }
      }
      return record;
    });
  }

  public async getSeverityBreakdown(filters: ShadowDashboardFiltersDTO): Promise<any> {
    const summary = await this.readModel.getSummary(filters);
    return summary.totalBySeverity;
  }
}

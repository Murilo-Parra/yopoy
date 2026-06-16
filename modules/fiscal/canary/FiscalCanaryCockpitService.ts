import { FiscalCanaryCockpitOverview, FiscalCanaryCockpitBlocker } from "./FiscalCanaryCockpitTypes";
import { FiscalCanaryCockpitReadModel } from "./FiscalCanaryCockpitReadModel";

export class FiscalCanaryCockpitService {
  private readModel = new FiscalCanaryCockpitReadModel();

  public async getOverview(companyId?: string): Promise<FiscalCanaryCockpitOverview> {
    const shadow = await this.readModel.getAggregatedShadowMetrics(companyId);
    const control = await this.readModel.getAggregatedControlMetrics(companyId);

    let globalStatus = "READY_FOR_REVIEW";
    if (shadow.blockers > 0) globalStatus = "BLOCKED";
    else if (shadow.totalRuns < 100) globalStatus = "INSUFFICIENT_EVIDENCE";
    else if (shadow.score < 90 || shadow.highs > 0) globalStatus = "NEEDS_REVIEW";

    return {
      generatedAt: new Date().toISOString(),
      simulationOnly: true,
      activationBlocked: true,
      globalReadinessScore: shadow.score,
      globalReadinessClass: shadow.score >= 90 ? "A" : shadow.score >= 80 ? "B" : "C",
      totalShadowRuns: shadow.totalRuns,
      totalDivergences: shadow.totalDivergences,
      totalBlockers: shadow.blockers,
      totalHighSeverity: shadow.highs,
      totalControlRecords: control.total,
      totalAllowlistSimulations: control.allowlists,
      totalApprovalSimulations: control.approvals,
      totalBlockedCandidates: control.blocked,
      recommendedStatus: globalStatus
    };
  }

  public async getBlockers(companyId?: string): Promise<FiscalCanaryCockpitBlocker[]> {
    const rawBlockers = await this.readModel.getBlockers(companyId);
    return rawBlockers.map(r => ({
      route: r.route,
      operation: r.operation,
      severity: r.severity,
      reason: r.reason,
      source: r.source,
      createdAt: r.created_at
    }));
  }
}

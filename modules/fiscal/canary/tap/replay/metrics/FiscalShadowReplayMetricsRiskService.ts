import { FiscalShadowReplayReadinessMetric, FiscalShadowReplayMetricsStatus, FiscalShadowReplayMetricsSummary } from "./FiscalShadowReplayMetricsTypes";

export class FiscalShadowReplayMetricsRiskService {
  public evaluateReadiness(summary: FiscalShadowReplayMetricsSummary, blockersCount: number): FiscalShadowReplayReadinessMetric {
     let status = FiscalShadowReplayMetricsStatus.SUFFICIENT_FOR_REVIEW;
     const blockers = [];
     const warnings = [];
     
     if (summary.totalSimulated < 5) {
         status = FiscalShadowReplayMetricsStatus.NOT_READY;
         blockers.push("Insufficient total simulations (minimum 5 required)");
     }

     if (summary.totalBlocked > 0 || blockersCount > 0) {
         status = FiscalShadowReplayMetricsStatus.BLOCKED_BY_RISK;
         blockers.push("Blocked items exist in the queue");
     }

     return {
        status,
        score: Math.min(100, summary.totalSimulated * 10),
        blockers,
        warnings,
        requiredBeforeActivation: ["Complete manual review", "Fix any remaining blockers"],
        approvedForRealCanary: false,
        approvedForProductionV2: false,
        simulationOnly: true,
        activationBlocked: true
     };
  }
}

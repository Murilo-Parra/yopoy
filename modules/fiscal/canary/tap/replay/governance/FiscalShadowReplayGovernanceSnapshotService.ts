import { FiscalShadowReplayGovernanceSnapshot, FiscalShadowReplayGovernanceStatus } from "./FiscalShadowReplayGovernanceTypes";
import { FiscalShadowReplayMetricsDashboardService } from "../metrics/FiscalShadowReplayMetricsDashboardService";

export class FiscalShadowReplayGovernanceSnapshotService {
  private metricsService: FiscalShadowReplayMetricsDashboardService;

  constructor(metricsService: FiscalShadowReplayMetricsDashboardService) {
    this.metricsService = metricsService;
  }

  public getSnapshot(): FiscalShadowReplayGovernanceSnapshot {
    const summary = this.metricsService.getSummary();
    return {
      generatedAt: new Date().toISOString(),
      source: "ShadowReplayMetricsDashboard",
      totalQueueItems: summary.totalQueueItems,
      totalManualCaptures: summary.totalSimulated,
      totalBatchRuns: summary.totalBatches,
      totalMetricsAvailable: summary.totalQueueItems,
      status: FiscalShadowReplayGovernanceStatus.OBSERVING_MANUAL_SIMULATIONS,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}

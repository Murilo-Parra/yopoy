import { FiscalShadowReplayMetricsSummary, FiscalShadowReplayRouteMetric, FiscalShadowReplayBlockerMetric, FiscalShadowReplaySeverityMetric } from "./FiscalShadowReplayMetricsTypes";
import { FiscalShadowReplayItemStatus } from "../FiscalShadowReplayTypes";

export class FiscalShadowReplayMetricsAggregator {
  
  public buildSummary(queueItems: any[], batchReport: any): FiscalShadowReplayMetricsSummary {
     let queued = 0, validated = 0, simulated = 0, skipped = 0, blocked = 0, failedSafe = 0;
     for (const item of queueItems) {
        if (item.status === FiscalShadowReplayItemStatus.QUEUED) queued++;
        if (item.status === FiscalShadowReplayItemStatus.VALIDATED) validated++;
        if (item.status === FiscalShadowReplayItemStatus.SIMULATED) simulated++;
        if (item.status === FiscalShadowReplayItemStatus.SKIPPED) skipped++;
        if (item.status === FiscalShadowReplayItemStatus.BLOCKED) blocked++;
        if (item.status === FiscalShadowReplayItemStatus.FAILED_SAFE) failedSafe++;
     }

     return {
        generatedAt: new Date().toISOString(),
        totalQueueItems: queueItems.length,
        totalValidated: validated,
        totalSimulated: simulated,
        totalSkipped: skipped,
        totalBlocked: blocked,
        totalFailedSafe: failedSafe,
        totalBatches: batchReport.totalBatches || 0,
        totalBatchItems: batchReport.totalItemsSimulated || 0,
        totalReviewed: batchReport.totalReviewed || 0,
        simulationOnly: true,
        activationBlocked: true,
        readOnly: true
     };
  }

  public buildRouteMetrics(queueItems: any[]): FiscalShadowReplayRouteMetric[] {
     const map = new Map<string, any>();
     for (const item of queueItems) {
         const key = item.route || "UNKNOWN";
         if (!map.has(key)) {
            map.set(key, {
                route: key,
                operation: item.operation || "UNKNOWN",
                totalItems: 0,
                totalSimulated: 0,
                totalBlocked: 0,
                totalDifferences: 0, // Mocked for metrics
                highestSeverity: "LOW",
                simulationOnly: true,
                activationBlocked: true
            });
         }
         const routeStat = map.get(key);
         routeStat.totalItems++;
         if (item.status === FiscalShadowReplayItemStatus.SIMULATED) routeStat.totalSimulated++;
         if (item.status === FiscalShadowReplayItemStatus.BLOCKED) routeStat.totalBlocked++;
     }
     return Array.from(map.values());
  }

  public buildBlockerMetrics(queueItems: any[]): FiscalShadowReplayBlockerMetric[] {
     const blockedItems = queueItems.filter(i => i.status === FiscalShadowReplayItemStatus.BLOCKED);
     if (blockedItems.length === 0) return [];
     
     return [{
        blockerCode: "BLOCKED_DURING_ENQUEUE_OR_BATCH",
        blockerReason: "Item failed validation",
        count: blockedItems.length,
        affectedRoutes: Array.from(new Set(blockedItems.map(i => i.route))),
        simulationOnly: true,
        activationBlocked: true
     }];
  }

  public buildSeverityMetrics(queueItems: any[]): FiscalShadowReplaySeverityMetric[] {
     return [
        {
           severity: "LOW",
           count: queueItems.filter(i => i.status === FiscalShadowReplayItemStatus.SIMULATED).length,
           affectedRoutes: Array.from(new Set(queueItems.map(i => i.route))),
           simulationOnly: true,
           activationBlocked: true
        }
     ];
  }
}

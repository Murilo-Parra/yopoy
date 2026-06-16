import { FiscalShadowReplayMetricsReadModel } from "./FiscalShadowReplayMetricsReadModel";
import { FiscalShadowReplayMetricsAggregator } from "./FiscalShadowReplayMetricsAggregator";
import { FiscalShadowReplayMetricsRiskService } from "./FiscalShadowReplayMetricsRiskService";

export class FiscalShadowReplayMetricsDashboardService {
  private readModel: FiscalShadowReplayMetricsReadModel;
  private aggregator: FiscalShadowReplayMetricsAggregator;
  private riskService: FiscalShadowReplayMetricsRiskService;

  constructor(readModel: FiscalShadowReplayMetricsReadModel) {
    this.readModel = readModel;
    this.aggregator = new FiscalShadowReplayMetricsAggregator();
    this.riskService = new FiscalShadowReplayMetricsRiskService();
  }

  public getSummary() {
    return this.aggregator.buildSummary(this.readModel.getQueueSnapshot(), this.readModel.getBatchReportSnapshot());
  }

  public getRouteMetrics() {
    return this.aggregator.buildRouteMetrics(this.readModel.getQueueSnapshot());
  }

  public getBlockerMetrics() {
    return this.aggregator.buildBlockerMetrics(this.readModel.getQueueSnapshot());
  }

  public getSeverityMetrics() {
    return this.aggregator.buildSeverityMetrics(this.readModel.getQueueSnapshot());
  }

  public getReadiness() {
    const summary = this.getSummary();
    const blockers = this.getBlockerMetrics();
    return this.riskService.evaluateReadiness(summary, blockers.length);
  }
}

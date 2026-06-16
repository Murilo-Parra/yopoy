import { FiscalShadowReplayMetricsDashboardService } from "./FiscalShadowReplayMetricsDashboardService";
import { FiscalShadowReplayMetricsReport } from "./FiscalShadowReplayMetricsTypes";

export class FiscalShadowReplayMetricsReportService {
    private dashboard: FiscalShadowReplayMetricsDashboardService;

    constructor(dashboard: FiscalShadowReplayMetricsDashboardService) {
        this.dashboard = dashboard;
    }

    public generateReport(): FiscalShadowReplayMetricsReport {
        return {
            summary: this.dashboard.getSummary(),
            routeMetrics: this.dashboard.getRouteMetrics(),
            blockerMetrics: this.dashboard.getBlockerMetrics(),
            severityMetrics: this.dashboard.getSeverityMetrics(),
            readiness: this.dashboard.getReadiness(),
            generatedAt: new Date().toISOString(),
            message: "Este relatório é read-only e não autoriza ativação real do Fiscal V2.",
            readOnly: true,
            simulationOnly: true,
            activationBlocked: true
        };
    }
}

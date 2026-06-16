import { FiscalShadowMirrorTelemetryAggregator } from './FiscalShadowMirrorTelemetryAggregator';
import { FiscalShadowMirrorTelemetryReport } from './FiscalShadowMirrorTelemetryTypes';

export class FiscalShadowMirrorTelemetryReportService {
  public static getReport(): FiscalShadowMirrorTelemetryReport {
    const stats = FiscalShadowMirrorTelemetryAggregator.getStats();

    return {
      generatedAt: new Date().toISOString(),
      totalSyntheticEvents: stats.totalSyntheticEvents,
      totalBlocked: stats.totalBlocked,
      totalAccepted: stats.totalAccepted,
      byRoute: stats.byRoute,
      byEventType: stats.byEventType,
      byStatus: stats.byStatus,
      readOnly: true,
      designOnly: true,
      telemetryDesignOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}

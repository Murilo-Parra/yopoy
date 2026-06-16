import { FiscalShadowMetrics } from "./FiscalShadowMetrics";
import { FiscalShadowMemoryStore } from "./FiscalShadowMemoryStore";
import { FiscalShadowConfig } from "./FiscalShadowConfig";

export class FiscalShadowDivergenceReport {
  public static generateAggregatedReport() {
    return {
      shadow: FiscalShadowConfig.isEnabled(),
      mode: FiscalShadowConfig.getMode(),
      metrics: FiscalShadowMetrics.getReport(),
      recentReports: FiscalShadowMemoryStore.getRecentReports()
    };
  }
}

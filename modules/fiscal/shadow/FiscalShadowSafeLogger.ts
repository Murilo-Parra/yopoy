import { FiscalShadowComparisonResult } from "./fiscalShadow.types";

export class FiscalShadowSafeLogger {
  public static log(route: string, result: FiscalShadowComparisonResult, requestId?: string) {
    // Only log safe overview, no sensitive payload or credentials
    const logData = {
      timestamp: new Date().toISOString(),
      route,
      requestId,
      shadow: result.shadow,
      mode: result.mode,
      operation: result.operation,
      matched: result.matched,
      severity: result.severity,
      differenceCount: result.differences?.length || 0,
      warningCount: result.warnings?.length || 0,
      summary: result.summary,
      sensitiveFieldsMasked: result.sensitiveFieldsMasked
    };

    if (!result.matched) {
      console.warn("[FISCAL_SHADOW_V2] Divergence detected:", JSON.stringify(logData));
    } else {
      console.log("[FISCAL_SHADOW_V2] Perfect match:", JSON.stringify(logData));
    }
  }

  public static logError(route: string, error: Error, requestId?: string) {
    console.error(`[FISCAL_SHADOW_V2] Internal Error running shadow on route ${route}:`, error.message);
  }
}

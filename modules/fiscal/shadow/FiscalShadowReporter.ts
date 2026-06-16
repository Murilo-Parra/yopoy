import { FiscalShadowComparisonResult, FiscalShadowDifference, FiscalShadowMode, FiscalShadowOperation, Severity } from "./fiscalShadow.types";

export class FiscalShadowReporter {
  public generateReport(
    mode: FiscalShadowMode,
    operation: FiscalShadowOperation,
    differences: FiscalShadowDifference[],
    warnings: string[],
    safeLegacyPayload?: any,
    safeV2Payload?: any
  ): FiscalShadowComparisonResult {
    let overallSeverity: Severity | null = null;
    
    if (differences.length > 0) {
      if (differences.some(d => d.severity === Severity.BLOCKER)) {
        overallSeverity = Severity.BLOCKER;
      } else if (differences.some(d => d.severity === Severity.HIGH)) {
        overallSeverity = Severity.HIGH;
      } else if (differences.some(d => d.severity === Severity.MEDIUM)) {
        overallSeverity = Severity.MEDIUM;
      } else {
        overallSeverity = Severity.LOW;
      }
    }

    const matched = differences.length === 0 && warnings.length === 0;

    let summary = matched 
      ? `A comparação identificou compatibilidade estrutural para ${operation}.`
      : `Encontradas divergências durante a comparação de ${operation}.`;
      
    if (mode === FiscalShadowMode.DISABLED) {
      summary = "Comparação shadow desabilitada.";
    }

    return {
      success: true,
      shadow: true,
      mode,
      operation,
      matched,
      severity: overallSeverity,
      summary,
      differences,
      warnings,
      legacyShapeSummary: this.getShapeSummary(safeLegacyPayload),
      v2ShapeSummary: this.getShapeSummary(safeV2Payload),
      sensitiveFieldsMasked: true
    };
  }

  private getShapeSummary(payload: any): any {
    if (!payload || typeof payload !== "object") return "scalar";
    if (Array.isArray(payload)) return `Array[${payload.length}]`;
    const shape: any = {};
    for (const key of Object.keys(payload)) {
      shape[key] = typeof payload[key];
    }
    return shape;
  }
}

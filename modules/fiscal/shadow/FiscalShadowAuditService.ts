import { FiscalShadowSanitizer } from "./FiscalShadowSanitizer";
import { FiscalShadowAuditRepository } from "./FiscalShadowAuditRepository";
import { FiscalShadowComparisonResult, FiscalShadowDifference } from "./fiscalShadow.types";
import { FiscalShadowAuditRecord } from "./FiscalShadowAuditTypes";

export class FiscalShadowAuditService {
  private repository = new FiscalShadowAuditRepository();

  public isEnabled(): boolean {
    const env = process.env.NODE_ENV || "development";
    if (env === "production") {
      return process.env.FISCAL_SHADOW_AUDIT_ENABLED === "true";
    }
    return process.env.FISCAL_SHADOW_AUDIT_ENABLED === "true";
  }

  private shouldPersistMatch(): boolean {
    return process.env.FISCAL_SHADOW_AUDIT_PERSIST_MATCHES === "true";
  }

  private getMinSeverityIndex(): number {
    const levels = ["LOW", "MEDIUM", "HIGH", "BLOCKER"];
    const minSeverity = process.env.FISCAL_SHADOW_AUDIT_MIN_SEVERITY || "LOW";
    const idx = levels.indexOf(minSeverity);
    return idx === -1 ? 0 : idx;
  }

  private isSeverityEligible(severity: string | null): boolean {
    if (!severity) return true; // Could be a match or unclassified
    const levels = ["LOW", "MEDIUM", "HIGH", "BLOCKER"];
    const idx = levels.indexOf(severity);
    if (idx === -1) return true;
    return idx >= this.getMinSeverityIndex();
  }

  public async persistReport(
    route: string, 
    companyId: string, 
    userId: string | undefined, 
    requestId: string | undefined,
    durationMs: number, 
    result: FiscalShadowComparisonResult
  ): Promise<void> {
    try {
      if (!this.isEnabled()) return;

      if (result.matched && !this.shouldPersistMatch()) return;
      if (!result.matched && !this.isSeverityEligible(result.severity)) return;

      const sanitizedFields = FiscalShadowSanitizer.sanitizeDifferences(result.differences || []);
      const serializedFields = JSON.stringify(sanitizedFields);

      const record: FiscalShadowAuditRecord = {
        companyId,
        userId,
        requestId,
        route,
        operation: result.operation,
        severity: result.severity,
        matched: result.matched,
        differenceCount: result.differences?.length || 0,
        warningCount: result.warnings?.length || 0,
        durationMs,
        summary: result.summary,
        fields: serializedFields,
        source: "fiscal-v2-shadow",
        createdAt: new Date().toISOString()
      };

      await this.repository.save(record);
    } catch (err: any) {
      console.error("[FISCAL_SHADOW_AUDIT_SVC] Erro interno na auditoria shadow:", err.message);
    }
  }
}

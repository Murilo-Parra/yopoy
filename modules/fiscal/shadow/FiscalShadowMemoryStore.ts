import { FiscalShadowComparisonResult, FiscalShadowOperation, Severity } from "./fiscalShadow.types";

export interface SafeShadowReport {
  route: string;
  operation: FiscalShadowOperation;
  matched: boolean;
  severity: Severity | null;
  differenceCount: number;
  warningCount: number;
  durationMs: number;
  timestamp: string;
  requestId?: string;
}

export class FiscalShadowMemoryStore {
  private static recentReports: SafeShadowReport[] = [];

  public static addReport(report: SafeShadowReport) {
    const bufferSize = parseInt(process.env.FISCAL_SHADOW_REPORT_BUFFER_SIZE || "100", 10);
    this.recentReports.unshift(report);
    if (this.recentReports.length > bufferSize) {
      this.recentReports.pop();
    }
  }

  public static getRecentReports(): SafeShadowReport[] {
    return this.recentReports;
  }

  public static reset() {
    this.recentReports = [];
  }
}

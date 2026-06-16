import { FiscalShadowTapManualAuditService } from "./FiscalShadowTapManualAuditService";
import { FiscalShadowTapManualReport } from "./FiscalShadowTapManualTypes";

export class FiscalShadowTapManualReportService {
  private auditService: FiscalShadowTapManualAuditService;
  private totalSimulations = 0;
  private totalBlocked = 0;
  private totalSanitized = 0;
  private totalDifferences = 0;

  constructor(auditService: FiscalShadowTapManualAuditService) {
    this.auditService = auditService;
  }

  public incrementSimulations(blocked: boolean, sanitized: boolean) {
      this.totalSimulations++;
      if (blocked) this.totalBlocked++;
      if (sanitized) this.totalSanitized++;
  }

  public incrementDifferences(diffCount: number) {
      this.totalDifferences += diffCount;
  }

  public getReport(): FiscalShadowTapManualReport {
      return {
          generatedAt: new Date().toISOString(),
          totalSimulations: this.totalSimulations,
          totalBlocked: this.totalBlocked,
          totalSanitized: this.totalSanitized,
          totalDifferences: this.totalDifferences,
          simulationOnly: true,
          activationBlocked: true
      };
  }
}

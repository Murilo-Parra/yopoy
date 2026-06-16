import { FiscalShadowMirrorCaptureReport, FiscalShadowMirrorCaptureStatus } from './FiscalShadowMirrorCaptureTypes';

export class FiscalShadowMirrorCaptureReportService {
  private static totalDryRuns = 0;
  private static totalBlocked = 0;
  private static totalValidated = 0;
  private static byRoute: Record<string, number> = {};
  private static byStatus: Record<string, number> = {};

  public static recordDryRun(routeId: string, status: FiscalShadowMirrorCaptureStatus | string) {
    this.totalDryRuns++;
    if (status === FiscalShadowMirrorCaptureStatus.DRY_RUN_SIMULATED) this.totalValidated++;
    else this.totalBlocked++;

    this.byRoute[routeId] = (this.byRoute[routeId] || 0) + 1;
    this.byStatus[status] = (this.byStatus[status] || 0) + 1;
  }

  public static getReport(): FiscalShadowMirrorCaptureReport {
    return {
      generatedAt: new Date().toISOString(),
      totalDryRuns: this.totalDryRuns,
      totalBlocked: this.totalBlocked,
      totalValidated: this.totalValidated,
      byRoute: this.byRoute,
      byStatus: this.byStatus,
      dryRunOnly: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}

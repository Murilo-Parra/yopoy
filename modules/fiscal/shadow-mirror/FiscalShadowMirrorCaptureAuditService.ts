export class FiscalShadowMirrorCaptureAuditService {
  private static auditLogs: any[] = [];

  public static async logDryRun(companyId: string, routeId: string, status: string, blockers: string[]): Promise<void> {
    this.auditLogs.push({
      action: 'SHADOW_MIRROR_CAPTURE_DRY_RUN',
      companyId,
      routeId,
      status,
      blockers,
      timestamp: new Date().toISOString(),
      dryRunOnly: true,
      adminEnvelopeOnly: true,
      captured: false,
      requestCaptured: false,
      responseCaptured: false,
      dispatched: false,
      routeToV2: false,
      routeToLegacy: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static async logAdministrativeRead(input: any): Promise<void> {
    this.auditLogs.push({
      action: 'SHADOW_MIRROR_CAPTURE_READ',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      timestamp: new Date().toISOString(),
      dryRunOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

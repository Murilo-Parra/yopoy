export class FiscalShadowMirrorPassiveTapAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'SHADOW_MIRROR_PASSIVE_TAP_READ',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      details: input.details,
      timestamp: new Date().toISOString(),
      designOnly: true,
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

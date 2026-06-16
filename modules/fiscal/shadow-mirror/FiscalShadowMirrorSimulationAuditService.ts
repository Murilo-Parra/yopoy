export class FiscalShadowMirrorSimulationAuditService {
  private static auditLogs: any[] = [];

  public static async logSimulationRun(companyId: string, routeId: string, status: string, blockers: string[]): Promise<void> {
    this.auditLogs.push({
      action: 'SHADOW_MIRROR_MANUAL_SIMULATION',
      companyId,
      routeId,
      status,
      blockers,
      timestamp: new Date().toISOString(),
      manualOnly: true,
      syntheticOnly: true,
      captured: false,
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
      action: 'SHADOW_MIRROR_SIMULATION_READ',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      timestamp: new Date().toISOString(),
      planningOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

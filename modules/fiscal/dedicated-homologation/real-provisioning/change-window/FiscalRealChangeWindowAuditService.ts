export class FiscalRealChangeWindowAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'CHANGE_WINDOW_READ',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      timestamp: new Date().toISOString(),
      governanceOnly: true,
      changeWindowPlanningOnly: true,
      executionReadinessOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      readOnly: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

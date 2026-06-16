export class FiscalRollbackAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'ROLLBACK_PLANNING_ACTION',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      details: input.details,
      timestamp: new Date().toISOString(),
      governanceOnly: true,
      planningOnly: true,
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

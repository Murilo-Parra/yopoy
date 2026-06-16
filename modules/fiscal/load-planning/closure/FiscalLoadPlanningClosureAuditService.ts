export class FiscalLoadPlanningClosureAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'LOAD_PLANNING_CLOSURE_READ',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      details: input.details,
      timestamp: new Date().toISOString(),
      readOnly: true,
      planningOnly: true,
      syntheticOnly: true,
      simulationOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

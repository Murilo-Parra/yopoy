export class FiscalRealApprovalDmlAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'READ_DML_DRY_RUN',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      timestamp: new Date().toISOString(),
      governanceOnly: true,
      dmlSeedDryRunOnly: true,
      controlledDataMutationSimulationOnly: true,
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

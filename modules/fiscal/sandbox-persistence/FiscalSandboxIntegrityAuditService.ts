export class FiscalSandboxIntegrityAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeRead(input: any): Promise<void> {
    this.auditLogs.push({
      action: 'INTEGRITY_READ',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      timestamp: new Date().toISOString(),
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    });
    // keep log size manageable
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

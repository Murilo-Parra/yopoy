export class FiscalHomologationMockAuditService {
  private static auditLogs: any[] = [];

  public static async logSimulationAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'HOMOLOGATION_MOCK_SIMULATION',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      scenario: input.scenario,
      timestamp: new Date().toISOString(),
      governanceOnly: true,
      simulationOnly: true,
      mockOnly: true,
      sandboxOnly: true,
      dryRunOnly: true,
      activationBlocked: true,
      readOnly: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

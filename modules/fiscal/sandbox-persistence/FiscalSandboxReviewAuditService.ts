export class FiscalSandboxReviewAuditService {
  private static auditLogs: any[] = [];

  public static async logDecision(input: any, result: string): Promise<void> {
    this.auditLogs.push({
      action: 'REVIEW_DECISION',
      recordId: input.recordId,
      companyId: input.companyId,
      decision: input.decision,
      result,
      timestamp: new Date().toISOString(),
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 1000) this.auditLogs.shift();
  }

  public static async logCleanupPreview(input: any, candidatesCount: number): Promise<void> {
    this.auditLogs.push({
      action: 'CLEANUP_PREVIEW',
      companyId: input.companyId,
      candidatesCount,
      timestamp: new Date().toISOString(),
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 1000) this.auditLogs.shift();
  }

  public static async logCleanupExecute(input: any, removedCount: number): Promise<void> {
     this.auditLogs.push({
      action: 'CLEANUP_EXECUTE',
      companyId: input.companyId,
      removedCount,
      timestamp: new Date().toISOString(),
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 1000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

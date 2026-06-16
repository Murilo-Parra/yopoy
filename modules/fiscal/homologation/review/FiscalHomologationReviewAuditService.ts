export class FiscalHomologationReviewAuditService {
  private static auditLogs: any[] = [];

  public static async logAdministrativeAction(input: any): Promise<void> {
    this.auditLogs.push({
      action: input.action || 'HOMOLOGATION_REVIEW_ACTION',
      endpoint: input.endpoint,
      companyId: input.companyId,
      userId: input.userId,
      timestamp: new Date().toISOString(),
      governanceOnly: true,
      simulationOnly: true,
      reviewOnly: true,
      mockOnly: true,
      readOnly: true,
      activationBlocked: true
    });
    if (this.auditLogs.length > 2000) this.auditLogs.shift();
  }

  public static getLogs() {
    return this.auditLogs;
  }
}

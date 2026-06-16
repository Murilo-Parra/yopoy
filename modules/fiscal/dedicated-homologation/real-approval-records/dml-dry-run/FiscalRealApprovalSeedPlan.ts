export class FiscalRealApprovalSeedPlan {
  public static generatePlan() {
    return {
      seedPlanGenerated: true,
      realDataSeeded: false,
      insertExecuted: false,
      dmlExecuted: false,
      commitExecuted: false,
      realDatabaseConnected: false,
      declarations: {
        isMockedAdministrativePlan: true,
        realDataNotGenerated: true,
        payloadNotGenerated: true,
        secretNotGenerated: true
      },
      plannedSafeFields: [
        'requestId',
        'companyId',
        'requestedBy',
        'approverA',
        'approverB',
        'approvalStatus',
        'approvalVersion',
        'governanceNotes',
        'createdAt'
      ]
    };
  }
}

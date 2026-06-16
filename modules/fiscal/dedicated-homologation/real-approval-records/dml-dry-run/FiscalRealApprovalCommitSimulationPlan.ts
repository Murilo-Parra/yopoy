export class FiscalRealApprovalCommitSimulationPlan {
  public static generatePlan() {
    return {
      commitPlanGenerated: true,
      transactionOpened: false,
      commitExecuted: false,
      rollbackExecuted: false,
      realDatabaseConnected: false,
      pseudoCommands: [
        'PSEUDO_BEGIN_TRANSACTION',
        'PSEUDO_COMMIT',
        'PSEUDO_ROLLBACK_ON_ERROR'
      ],
      declarations: {
        futureRollbackHandledAsDescriptionOnly: true
      }
    };
  }
}

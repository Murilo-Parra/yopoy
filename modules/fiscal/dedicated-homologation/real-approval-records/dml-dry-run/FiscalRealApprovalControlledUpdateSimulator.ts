export class FiscalRealApprovalControlledUpdateSimulator {
  public static simulateUpdate() {
    return {
      updateSimulationGenerated: true,
      executableSqlIncluded: false,
      updateExecuted: false,
      dmlExecuted: false,
      commitExecuted: false,
      pseudoCommands: [
        'PSEUDO_UPDATE fiscal_real_approval_records SET status = simulated WHERE requestId = simulated'
      ],
      declarations: {
        executedSql: null,
        simulatedOnly: true,
        realUpdateBlocked: true,
        realDatabaseConnected: false
      }
    };
  }
}

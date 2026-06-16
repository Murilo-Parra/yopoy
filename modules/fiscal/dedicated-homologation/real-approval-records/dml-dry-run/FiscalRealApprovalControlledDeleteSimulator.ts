export class FiscalRealApprovalControlledDeleteSimulator {
  public static simulateDelete() {
    return {
      deleteSimulationGenerated: true,
      executableSqlIncluded: false,
      deleteExecuted: false,
      dmlExecuted: false,
      commitExecuted: false,
      pseudoCommands: [
        'PSEUDO_DELETE_FROM fiscal_real_approval_records WHERE status = simulated'
      ],
      declarations: {
        executedSql: null,
        simulatedOnly: true,
        realDeleteBlocked: true,
        realDatabaseConnected: false
      }
    };
  }
}

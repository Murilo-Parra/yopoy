export class FiscalRealApprovalControlledInsertSimulator {
  public static simulateInsert() {
    return {
      insertSimulationGenerated: true,
      executableSqlIncluded: false,
      insertExecuted: false,
      dmlExecuted: false,
      commitExecuted: false,
      pseudoCommands: [
        'PSEUDO_INSERT_INTO fiscal_real_approval_records (requestId, companyId, status) VALUES (simulated, simulated, simulated)'
      ],
      declarations: {
        executedSql: null,
        simulatedOnly: true,
        realInsertBlocked: true,
        realDatabaseConnected: false
      }
    };
  }
}

export class FiscalRealApprovalControlledDdlSimulator {
  public static simulateDdl() {
    return {
      controlledDdlSimulationGenerated: true,
      executableSqlIncluded: false,
      createTableExecuted: false,
      alterTableExecuted: false,
      dropTableExecuted: false,
      ddlExecuted: false,
      pseudoCommands: [
        'PSEUDO_COMPILE_TABLE fiscal_real_approval_records',
        'PSEUDO_ATTACH_FIELD id UUID',
        'PSEUDO_ATTACH_FIELD company_id VARCHAR',
        'PSEUDO_BIND_CONSTRAINT approver_a != approver_b'
      ],
      declarations: {
        executedSql: null,
        simulatedOnly: true,
        realDdlBlocked: true
      }
    };
  }
}

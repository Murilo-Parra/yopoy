export class FiscalProductionDataBoundaryLockedPlan {
  public static getPlan() {
    return {
      dataBoundaryLockedPlanGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Declara banco e transações bloqueados. Não executa DML/DDL.'
    };
  }
}

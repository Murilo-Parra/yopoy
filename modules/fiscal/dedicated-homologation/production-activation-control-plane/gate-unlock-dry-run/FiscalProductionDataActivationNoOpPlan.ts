export class FiscalProductionDataActivationNoOpPlan {
  public static getPlan() {
    return {
      dataActivationNoOpPlanGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Bloquear banco real, DML e DDL.'
    };
  }
}

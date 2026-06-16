export class FiscalProductionRuntimeDbTransactionNoOpPlan {
  public static generatePlan() {
    return {
      dbTransactionNoOpPlanGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Modelagem do plano no-op de transação de banco. Não conecta banco real nem executa DDL/DML.'
    };
  }
}

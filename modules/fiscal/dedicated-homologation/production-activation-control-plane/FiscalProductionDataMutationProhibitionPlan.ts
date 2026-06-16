export class FiscalProductionDataMutationProhibitionPlan {
  public static getPlan() {
    return {
      dataMutationProhibitionPlanGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Modelar plano de bloqueio de dados produtivos. Não conectar banco real. Não executar DML/DDL.'
    };
  }
}

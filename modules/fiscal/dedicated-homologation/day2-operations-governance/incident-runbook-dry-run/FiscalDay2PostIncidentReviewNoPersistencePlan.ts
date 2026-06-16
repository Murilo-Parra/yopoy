export class FiscalDay2PostIncidentReviewNoPersistencePlan {
  public static getPlan() {
    return {
      postIncidentReviewNoPersistencePlanGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelagem de post-incident review sem persistência produtiva. Não grava em banco real. Não executa DML/DDL.'
    };
  }
}

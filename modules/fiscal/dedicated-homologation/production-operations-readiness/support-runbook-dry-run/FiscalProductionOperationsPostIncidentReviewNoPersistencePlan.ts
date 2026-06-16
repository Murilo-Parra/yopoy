export class FiscalProductionOperationsPostIncidentReviewNoPersistencePlan {
  public static getPlan() {
    return {
      postIncidentReviewNoPersistencePlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Modelar revisão pós-incidente sem persistência real. Não gravar payload bruto. Não gravar dado sensível. Não executar DML/DDL.'
    };
  }
}

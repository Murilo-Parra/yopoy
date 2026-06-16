export class FiscalProductionDataBoundaryEvidenceReview {
  public static getReview() {
    return {
      dataBoundaryEvidenceReviewGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Revisa fronteira de dados bloqueada. Não conecta banco real. Não executa DML/DDL.'
    };
  }
}

export class FiscalProductionRetrievalSuppressionNoReadPlan {
  public static getPlan() {
    return {
      retrievalSuppressionNoReadPlanGenerated: true,
      realRecordRetrieved: false,
      realArchiveRead: false,
      realPayloadRead: false,
      description: 'Bloquear retrieval real de registros, archives e evidências.'
    };
  }
}

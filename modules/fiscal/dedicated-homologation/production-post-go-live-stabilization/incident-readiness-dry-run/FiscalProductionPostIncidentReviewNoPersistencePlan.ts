export class FiscalProductionPostIncidentReviewNoPersistencePlan {
  public static getPlan() {
    return {
      postIncidentReviewNoPersistencePlanGenerated: true,
      dmlExecuted: false,
      fileSystemWritten: false,
      description: 'Modelar post-incident review sem persistência. Não gravar banco. Não gravar filesystem.'
    };
  }
}

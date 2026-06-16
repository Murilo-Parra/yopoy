export class FiscalProductionOperationsDeliberationNoPersistenceEvidence {
  public static getEvidence() {
    return {
      deliberationNoPersistenceEvidenceGenerated: true,
      realDeliberationPersisted: false,
      realApprovalRecordPersisted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Evidenciar ausência de persistência real da deliberação.'
    };
  }
}

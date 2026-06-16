export class FiscalProductionDeliberationNoPersistenceEvidence {
  public static getEvidence() {
    return {
      deliberationNoPersistenceEvidenceGenerated: true,
      realDeliberationPersisted: false,
      dmlExecuted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Evidencia que a deliberação não foi persistida como real. Não executa DML.'
    };
  }
}

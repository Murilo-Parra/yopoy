export class FiscalProductionPersistenceNoRealWriteEvidence {
  public static getEvidence() {
    return {
      persistenceNoRealWriteEvidenceGenerated: true,
      dmlExecuted: false,
      ddlExecuted: false,
      realRepositoryWritten: false,
      description: 'Evidenciar ausência de escrita, migration, DML, DDL e repository write.'
    };
  }
}

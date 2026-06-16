export class FiscalProductionEvidenceNoCustodyPersistenceEvidence {
  public static getEvidence() {
    return {
      noCustodyPersistenceEvidenceGenerated: true,
      chainOfCustodyPersisted: false,
      realEvidencePersisted: false,
      realAuditRecordPersisted: false,
      description: 'Evidenciar ausência de persistência de custódia.'
    };
  }
}

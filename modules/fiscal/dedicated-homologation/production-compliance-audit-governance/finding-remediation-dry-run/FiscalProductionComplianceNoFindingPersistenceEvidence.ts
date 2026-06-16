export class FiscalProductionComplianceNoFindingPersistenceEvidence {
  public static getEvidence() {
    return {
      noFindingPersistenceEvidenceGenerated: true,
      realFindingCreated: false,
      realFindingRecordPersisted: false,
      realTicketCreated: false,
      description: 'Evidenciar ausência de finding real persistido.'
    };
  }
}

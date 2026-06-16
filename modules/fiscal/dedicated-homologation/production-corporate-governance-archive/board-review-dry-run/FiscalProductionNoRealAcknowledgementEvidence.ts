export class FiscalProductionNoRealAcknowledgementEvidence {
  public static getEvidence() {
    return {
      noRealAcknowledgementEvidenceGenerated: true,
      realExecutiveAcknowledgementCollected: false,
      realAcknowledgementRecordPersisted: false,
      description: 'Evidenciar que nenhuma ciência real foi coletada/persistida.'
    };
  }
}

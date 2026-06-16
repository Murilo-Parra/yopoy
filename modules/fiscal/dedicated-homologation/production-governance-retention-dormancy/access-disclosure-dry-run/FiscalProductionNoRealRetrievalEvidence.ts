export class FiscalProductionNoRealRetrievalEvidence {
  public static getEvidence() {
    return {
      noRealRetrievalEvidenceGenerated: true,
      realRecordRetrieved: false,
      realArchiveRead: false,
      description: 'Evidenciar que nenhum registro/arquivo real foi recuperado ou lido.'
    };
  }
}

export class FiscalProductionNoRealCustodyEvidence {
  public static getEvidence() {
    return {
      noRealCustodyEvidenceGenerated: true,
      realCustodyCreated: false,
      description: 'Evidenciar que nenhuma custódia real foi criada.'
    };
  }
}

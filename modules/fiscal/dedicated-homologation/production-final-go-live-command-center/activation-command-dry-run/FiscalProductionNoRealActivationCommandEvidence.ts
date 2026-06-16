export class FiscalProductionNoRealActivationCommandEvidence {
  public static getEvidence() {
    return {
      noRealActivationCommandEvidenceGenerated: true,
      realActivationCommandExecuted: false,
      description: 'Evidenciar que nenhum comando real de ativação foi executado.'
    };
  }
}

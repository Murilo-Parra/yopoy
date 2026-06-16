export class FiscalProductionNoRealFinalCommandEvidence {
  public static getEvidence() {
    return {
      noRealFinalCommandEvidenceGenerated: true,
      realFinalCommandExecuted: false,
      realActivationCommandExecuted: false,
      realGoLiveExecuted: false,
      description: 'Evidenciar ausência de comando final real.'
    };
  }
}

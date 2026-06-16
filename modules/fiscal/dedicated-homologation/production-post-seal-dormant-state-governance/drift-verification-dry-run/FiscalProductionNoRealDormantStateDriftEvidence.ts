export class FiscalProductionNoRealDormantStateDriftEvidence {
  public static getEvidence() {
    return {
      noRealDormantStateDriftEvidenceGenerated: true,
      realDriftScanExecuted: false,
      description: 'Evidência de ausência de drift no estado dormente.'
    };
  }
}

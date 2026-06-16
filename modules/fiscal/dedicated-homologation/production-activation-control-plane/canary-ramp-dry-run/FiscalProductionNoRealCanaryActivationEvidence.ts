export class FiscalProductionNoRealCanaryActivationEvidence {
  public static getEvidence() {
    return {
      noRealCanaryActivationEvidenceGenerated: true,
      realCanaryActivated: false,
      productionV2Activated: false,
      description: 'Evidenciar ausência de canary real.'
    };
  }
}

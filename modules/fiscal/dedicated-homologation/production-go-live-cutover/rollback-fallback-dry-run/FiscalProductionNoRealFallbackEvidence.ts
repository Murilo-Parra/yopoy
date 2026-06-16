export class FiscalProductionNoRealFallbackEvidence {
  public static getEvidence() {
    return {
      noRealFallbackEvidenceGenerated: true,
      realFallbackExecuted: false,
      trafficChanged: false,
      description: 'Evidenciar ausência de fallback real.'
    };
  }
}

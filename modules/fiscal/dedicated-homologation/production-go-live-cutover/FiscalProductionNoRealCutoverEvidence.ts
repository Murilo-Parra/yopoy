export class FiscalProductionNoRealCutoverEvidence {
  public static getEvidence() {
    return {
      noRealCutoverEvidenceGenerated: true,
      realCutoverExecuted: false,
      trafficChanged: false,
      description: 'Evidenciar ausência de cutover real.'
    };
  }
}

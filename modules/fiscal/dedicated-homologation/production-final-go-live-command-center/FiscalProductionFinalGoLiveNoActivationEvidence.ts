export class FiscalProductionFinalGoLiveNoActivationEvidence {
  public static getEvidence() {
    return {
      noActivationEvidenceGenerated: true,
      productionV2Activated: false,
      realGoLiveExecuted: false,
      routeToV2: false,
      description: 'Evidenciar ausência de ativação V2/go-live/cutover real.'
    };
  }
}

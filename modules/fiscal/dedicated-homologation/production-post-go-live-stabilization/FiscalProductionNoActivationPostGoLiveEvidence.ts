export class FiscalProductionNoActivationPostGoLiveEvidence {
  public static getEvidence() {
    return {
      noActivationPostGoLiveEvidenceGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Evidenciar ausência de ativação pós-go-live.'
    };
  }
}

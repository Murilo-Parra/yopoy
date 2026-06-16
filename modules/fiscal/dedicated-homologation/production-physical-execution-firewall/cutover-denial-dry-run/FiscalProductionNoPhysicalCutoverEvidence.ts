export class FiscalProductionNoPhysicalCutoverEvidence {
  public static getEvidence() {
    return {
      noPhysicalCutoverEvidenceGenerated: true,
      realCutoverExecuted: false,
      realGoLiveExecuted: false,
      routeToV2: false,
      description: 'Evidenciar ausência de cutover físico.'
    };
  }
}

export class FiscalProductionNoTrafficMutationEvidence {
  public static getEvidence() {
    return {
      noTrafficMutationEvidenceGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      description: 'Evidenciar ausência de mutação real de tráfego.'
    };
  }
}

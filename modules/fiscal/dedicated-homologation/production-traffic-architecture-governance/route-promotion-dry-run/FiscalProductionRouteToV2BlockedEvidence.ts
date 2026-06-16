export class FiscalProductionRouteToV2BlockedEvidence {
  public static getEvidence() {
    return {
      routeToV2BlockedEvidenceGenerated: true,
      routeToV2: false,
      productionV2Activated: false,
      description: 'Evidenciar que routeToV2 permanece bloqueado.'
    };
  }
}

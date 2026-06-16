export class FiscalProductionRoutingResumptionBlockedMatrix {
  public static getMatrix() {
    return {
      routingResumptionBlockedMatrixGenerated: true,
      realRoutingResumed: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Bloquear retomada de roteamento.'
    };
  }
}

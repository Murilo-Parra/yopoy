export class FiscalProductionRoutingReentryDenialMatrix {
  public static getMatrix() {
    return {
      routingReentryDenialMatrixGenerated: true,
      realRoutingResumed: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Negar retomada de roteamento.'
    };
  }
}

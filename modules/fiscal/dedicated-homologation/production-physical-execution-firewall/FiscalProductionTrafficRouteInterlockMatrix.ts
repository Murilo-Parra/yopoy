export class FiscalProductionTrafficRouteInterlockMatrix {
  public static getMatrix() {
    return {
      trafficRouteInterlockMatrixGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      realTrafficPromoted: false,
      realCanaryActivated: false,
      description: 'Bloquear tráfego real, routeToV2, promoção e canary.'
    };
  }
}

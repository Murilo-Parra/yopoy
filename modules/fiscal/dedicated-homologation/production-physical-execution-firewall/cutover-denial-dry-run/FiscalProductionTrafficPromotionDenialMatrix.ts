export class FiscalProductionTrafficPromotionDenialMatrix {
  public static getMatrix() {
    return {
      trafficPromotionDenialMatrixGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      realTrafficPromoted: false,
      description: 'Bloquear promoção de tráfego real.'
    };
  }
}

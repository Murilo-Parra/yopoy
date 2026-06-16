export class FiscalProductionTrafficPromotionNoOpPlan {
  public static getPlan() {
    return {
      trafficPromotionNoOpPlanGenerated: true,
      realTrafficPromoted: false,
      trafficChanged: false,
      description: 'Modelar promoção de tráfego como no-op. Não promover tráfego real.'
    };
  }
}

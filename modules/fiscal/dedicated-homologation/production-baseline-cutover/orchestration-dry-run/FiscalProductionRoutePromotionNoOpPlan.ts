export class FiscalProductionRoutePromotionNoOpPlan {
  public static getPlan() {
    return {
      routePromotionNoOpPlanGenerated: true,
      realRoutePromoted: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Modelagem promoção de rota como no-op. Não promove routeToV2. Não altera routeToLegacy.'
    };
  }
}

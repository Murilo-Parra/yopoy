export class FiscalProductionRoutePromotionNoOpBlueprint {
  public static getBlueprint() {
    return {
      routePromotionNoOpBlueprintGenerated: true,
      realRoutePromoted: false,
      routeToV2: false,
      description: 'Modelar promoção futura de rotas apenas como blueprint administrativo. Não promover rota real. Não alterar routeToV2.'
    };
  }
}

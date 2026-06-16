export class FiscalProductionTrafficRoutingNoOpBlueprint {
  public static getBlueprint() {
    return {
      trafficRoutingNoOpBlueprintGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      description: 'Modelar roteamento produtivo como no-op. Não alterar tráfego real. Não alterar routeToV2.'
    };
  }
}

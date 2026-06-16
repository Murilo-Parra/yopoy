export class FiscalProductionCommandCenterNoRoutingPlan {
  public static getPlan() {
    return {
      commandCenterNoRoutingPlanGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      realTrafficChanged: false,
      description: 'Impedir routeToV2, tráfego, load balancer, DNS, proxy, middleware, tap, mirror, sniffer e shadow traffic reais.'
    };
  }
}

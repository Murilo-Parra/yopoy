export class FiscalProductionFinalReadinessNoRoutingPlan {
  public static getPlan() {
    return {
      noRoutingPlanGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      realTrafficChanged: false,
      description: 'Reforçar que readiness não altera routeToV2, legacy, tráfego, load balancer, DNS ou proxy.'
    };
  }
}

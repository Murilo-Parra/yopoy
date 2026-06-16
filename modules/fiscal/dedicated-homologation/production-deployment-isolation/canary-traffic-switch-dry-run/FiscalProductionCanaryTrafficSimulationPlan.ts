export class FiscalProductionCanaryTrafficSimulationPlan {
  public static generatePlan() {
    return {
      canaryTrafficSimulationPlanGenerated: true,
      realCanaryApproved: false,
      canaryActivated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Modeled synthetic canary traffic switch. No real canary or traffic routing changes occur.'
    };
  }
}

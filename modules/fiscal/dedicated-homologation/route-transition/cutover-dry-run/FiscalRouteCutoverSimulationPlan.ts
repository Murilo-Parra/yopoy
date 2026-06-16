export class FiscalRouteCutoverSimulationPlan {
  public static simulate() {
    return {
      cutoverSimulationPlanGenerated: true,
      cutoverSimulated: true,
      cutoverExecuted: false,
      realRouteTransitionExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Simulation of cutover process. Real routing unchanged.'
    };
  }
}

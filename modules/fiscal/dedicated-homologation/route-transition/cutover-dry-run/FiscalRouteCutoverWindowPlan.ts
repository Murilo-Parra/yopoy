export class FiscalRouteCutoverWindowPlan {
  public static generatePlan() {
    return {
      cutoverWindowPlanGenerated: true,
      description: 'Documentary cutover window. Does not authorize real execution.',
      cutoverExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false
    };
  }
}

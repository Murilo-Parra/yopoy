export class FiscalProductionTrafficSwitchPlan {
  public static generatePlan() {
    return {
      trafficSwitchPlanGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Traffic switch modeled between Legacy and V2. No real traffic was changed. Route remains to Legacy.'
    };
  }
}

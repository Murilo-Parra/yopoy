export class FiscalProductionTrafficReversionPlan {
  public static generatePlan() {
    return {
      trafficReversionPlanGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Model of future V2 to Legacy traffic reversion. No real routing installed.'
    };
  }
}

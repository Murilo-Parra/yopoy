export class FiscalFinalGoLiveTrafficFreezePlan {
  public static generatePlan() {
    return {
      trafficFreezePlanGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Documentary traffic freeze plan. Does not touch real router. Legacy routing remains active.'
    };
  }
}

export class FiscalProductionTrafficSwitchDryRunPlan {
  public static generatePlan() {
    return {
      trafficSwitchPlanGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      appUseModified: false,
      middlewareInstalled: false,
      description: 'Simulated traffic switch plan. Route to V2 is disabled. Legacy routing and app.use remain untouched.'
    };
  }
}

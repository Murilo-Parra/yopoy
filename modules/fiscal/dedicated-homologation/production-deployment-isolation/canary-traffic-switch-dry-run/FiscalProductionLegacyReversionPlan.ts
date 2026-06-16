export class FiscalProductionLegacyReversionPlan {
  public static generatePlan() {
    return {
      legacyReversionPlanGenerated: true,
      realLegacyReversionExecuted: false,
      routeToLegacy: true,
      routeToV2: false,
      trafficChanged: false,
      description: 'Modeled plan for fallback to legacy. No real reversion actions are carried out.'
    };
  }
}

export class FiscalProductionLegacyFallbackPlan {
  public static generatePlan() {
    return {
      legacyFallbackPlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Future fallback plan modeled for legacy routes. No real traffic altered, legacy handler not called as side-effect.'
    };
  }
}

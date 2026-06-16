export class FiscalProductionLegacyFallbackOrchestrationPlan {
  public static getPlan() {
    return {
      legacyFallbackOrchestrationPlanGenerated: true,
      routeToLegacy: true,
      legacyHandlerCalled: false,
      description: 'Preservar fallback legado. Não chama handler legado como side-effect.'
    };
  }
}

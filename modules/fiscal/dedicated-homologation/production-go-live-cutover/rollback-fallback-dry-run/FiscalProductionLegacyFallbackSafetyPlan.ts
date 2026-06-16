export class FiscalProductionLegacyFallbackSafetyPlan {
  public static getPlan() {
    return {
      legacyFallbackSafetyPlanGenerated: true,
      routeToLegacy: true,
      realFallbackExecuted: false,
      description: 'Modelar fallback legado sem execução real. Preservar routeToLegacy true. Não desabilitar legado.'
    };
  }
}

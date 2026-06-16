export class FiscalProductionFallbackExecutionDenialPlan {
  public static getPlan() {
    return {
      fallbackExecutionDenialPlanGenerated: true,
      realFallbackExecuted: false,
      routeToLegacy: true,
      description: 'Negar fallback real. Preservar legado como rota obrigatória sem executar fallback ativo.'
    };
  }
}

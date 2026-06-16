export class FiscalProductionLegacyFallbackNoOpPlan {
  public static getPlan() {
    return {
      legacyFallbackNoOpPlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      trafficChanged: false,
      description: 'Modelagem do fallback legado em no-op. Não executa fallback real porque legado já permanece ativo.'
    };
  }
}

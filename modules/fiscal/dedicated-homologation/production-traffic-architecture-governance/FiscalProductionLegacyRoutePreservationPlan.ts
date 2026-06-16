export class FiscalProductionLegacyRoutePreservationPlan {
  public static getPlan() {
    return {
      legacyRoutePreservationPlanGenerated: true,
      routeToLegacy: true,
      realLegacyHandlerCalled: false,
      description: 'Documentar preservação obrigatória do legado.'
    };
  }
}

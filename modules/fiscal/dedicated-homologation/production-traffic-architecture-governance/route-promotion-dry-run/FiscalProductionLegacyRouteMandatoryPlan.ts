export class FiscalProductionLegacyRouteMandatoryPlan {
  public static getPlan() {
    return {
      legacyRouteMandatoryPlanGenerated: true,
      routeToLegacy: true,
      realLegacyHandlerCalled: false,
      description: 'Documentar legado como rota obrigatória.'
    };
  }
}

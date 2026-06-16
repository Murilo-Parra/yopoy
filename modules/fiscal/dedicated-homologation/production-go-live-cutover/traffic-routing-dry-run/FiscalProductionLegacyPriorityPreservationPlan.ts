export class FiscalProductionLegacyPriorityPreservationPlan {
  public static getPlan() {
    return {
      legacyPriorityPreservationPlanGenerated: true,
      routeToLegacy: true,
      realLegacyHandlerCalled: false,
      description: 'Preservar prioridade do legado.'
    };
  }
}

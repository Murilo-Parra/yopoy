export class FiscalProductionOperationsLegacyContinuityPlan {
  public static getPlan() {
    return {
      legacyContinuityPlanGenerated: true,
      routeToLegacy: true,
      legacyHandlerCalled: false,
      description: 'Preservar continuidade legada. Manter routeToLegacy: true. Não chamar handler legado como side-effect.'
    };
  }
}

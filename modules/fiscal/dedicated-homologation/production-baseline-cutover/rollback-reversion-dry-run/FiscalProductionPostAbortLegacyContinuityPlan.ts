export class FiscalProductionPostAbortLegacyContinuityPlan {
  public static getPlan() {
    return {
      postAbortLegacyContinuityPlanGenerated: true,
      routeToLegacy: true,
      legacyHandlerCalled: false,
      description: 'Preservar continuidade legada pós-abort. Não chama handler legado como side-effect.'
    };
  }
}

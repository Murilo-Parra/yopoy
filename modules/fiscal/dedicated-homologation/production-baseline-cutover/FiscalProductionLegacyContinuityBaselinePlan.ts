export class FiscalProductionLegacyContinuityBaselinePlan {
  public static getPlan() {
    return {
      legacyContinuityBaselinePlanGenerated: true,
      routeToLegacy: true,
      legacyHandlerCalled: false,
      description: 'Plano de continuidade obrigatória do legado. Não chama handler legado como side-effect.'
    };
  }
}

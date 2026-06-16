export class FiscalProductionLegacyContinuityNoOpPlan {
  public static getPlan() {
    return {
      legacyContinuityNoOpPlanGenerated: true,
      routeToLegacy: true,
      legacyHandlerCalled: false,
      description: 'Preserva a rota legada como obrigatória. Não chama handler legado como side-effect.'
    };
  }
}

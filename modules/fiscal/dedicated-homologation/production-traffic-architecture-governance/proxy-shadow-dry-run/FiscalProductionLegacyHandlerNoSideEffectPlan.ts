export class FiscalProductionLegacyHandlerNoSideEffectPlan {
  public static getPlan() {
    return {
      legacyHandlerNoSideEffectPlanGenerated: true,
      routeToLegacy: true,
      realLegacyHandlerCalled: false,
      description: 'Preservar o legado sem chamar handler real como side-effect.'
    };
  }
}

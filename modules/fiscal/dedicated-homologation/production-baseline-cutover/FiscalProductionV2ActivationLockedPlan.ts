export class FiscalProductionV2ActivationLockedPlan {
  public static getPlan() {
    return {
      v2ActivationLockedPlanGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      v2HandlerCalled: false,
      description: 'Declara Produção V2 travada. Não ativa routeToV2.'
    };
  }
}

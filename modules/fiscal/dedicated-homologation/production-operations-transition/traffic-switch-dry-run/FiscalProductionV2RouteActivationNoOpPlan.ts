export class FiscalProductionV2RouteActivationNoOpPlan {
  public static getPlan() {
    return {
      v2RouteActivationNoOpPlanGenerated: true,
      productionV2Activated: false,
      v2HandlerCalled: false,
      description: 'Modelagem de ativação V2 como plano inerte. Não ativa Produção V2 nem chama handler V2 real.'
    };
  }
}

export class FiscalProductionRouteActivationGateNoOpPlan {
  public static getPlan() {
    return {
      routeActivationGateNoOpPlanGenerated: true,
      realExecutionGateUnlocked: false,
      routeToV2: false,
      description: 'Modelagem de gate de ativação de rota como no-op. Não destrava gate real nem ativa routeToV2.'
    };
  }
}

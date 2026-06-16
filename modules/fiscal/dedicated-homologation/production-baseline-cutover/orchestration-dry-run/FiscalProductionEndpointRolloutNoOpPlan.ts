export class FiscalProductionEndpointRolloutNoOpPlan {
  public static getPlan() {
    return {
      endpointRolloutNoOpPlanGenerated: true,
      realEndpointRolloutExecuted: false,
      realEndpointCalled: false,
      description: 'Modelagem de rollout de endpoint como no-op. Não chama endpoint real. Não executa rollout real.'
    };
  }
}

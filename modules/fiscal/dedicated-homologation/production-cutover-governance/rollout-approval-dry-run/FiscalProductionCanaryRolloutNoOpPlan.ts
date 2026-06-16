export class FiscalProductionCanaryRolloutNoOpPlan {
  public static getPlan() {
    return {
      canaryRolloutNoOpPlanGenerated: true,
      canaryActivated: false,
      trafficChanged: false,
      description: 'Modelagem de rollout canário como no-op. Não ativa canary real. Não altera tráfego.'
    };
  }
}

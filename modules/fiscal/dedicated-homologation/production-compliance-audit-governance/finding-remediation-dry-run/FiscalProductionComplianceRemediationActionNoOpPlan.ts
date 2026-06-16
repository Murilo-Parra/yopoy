export class FiscalProductionComplianceRemediationActionNoOpPlan {
  public static getPlan() {
    return {
      remediationActionNoOpPlanGenerated: true,
      realRemediationExecuted: false,
      description: 'Modelar plano de remediação no-op. Não executar correção real.'
    };
  }
}

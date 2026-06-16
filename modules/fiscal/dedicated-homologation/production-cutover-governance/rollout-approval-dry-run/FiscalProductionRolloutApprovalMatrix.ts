export class FiscalProductionRolloutApprovalMatrix {
  public static getMatrix() {
    return {
      rolloutApprovalMatrixGenerated: true,
      realRolloutApproved: false,
      realRolloutExecuted: false,
      description: 'Modelagem administrativa de aprovação de rollout. Não aprova rollout real. Não executa rollout real.'
    };
  }
}

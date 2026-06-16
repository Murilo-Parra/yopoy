export class FiscalProductionActivationApprovalCharter {
  public static getCharter() {
    return {
      approvalCharterGenerated: true,
      realApprovalConcluded: false,
      activationBlocked: true,
      description: 'Modelar charter de aprovação do Control Plane. Não concluir aprovação real.'
    };
  }
}

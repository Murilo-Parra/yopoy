export class FiscalProductionFirewallApproverEligibilityMatrix {
  public static getMatrix() {
    return {
      approverEligibilityMatrixGenerated: true,
      realAuthorizationGranted: false,
      description: 'Modelar elegibilidade de aprovadores. Não notificar aprovador real. Não conceder autorização real.'
    };
  }
}

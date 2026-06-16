export class FiscalProductionActivationPreApprovalMatrix {
  public static getMatrix() {
    return {
      preApprovalMatrixGenerated: true,
      realApprovalRecordPersisted: false,
      realAuthorizationGranted: false,
      description: 'Modelar pré-aprovação não executável. Não persistir approval record real. Não conceder autorização real.'
    };
  }
}

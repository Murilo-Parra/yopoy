export class FiscalProductionBaselineApprovalMatrix {
  public static getMatrix() {
    return {
      approvalMatrixGenerated: true,
      realCutoverApproved: false,
      realExecutionGateUnlocked: false,
      description: 'Modelagem matriz de aprovação administrativa. Não conclui aprovação real nem destrava gate.'
    };
  }
}

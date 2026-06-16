export class FiscalProductionStabilizationDecisionNoAuthorizationMatrix {
  public static getMatrix() {
    return {
      stabilizationDecisionNoAuthorizationMatrixGenerated: true,
      realStabilizationDecisionAuthorized: false,
      realExecutionGateUnlocked: false,
      description: 'Modelar decisão de estabilização sem autorização real. Não destravar gate. Não emitir token.'
    };
  }
}

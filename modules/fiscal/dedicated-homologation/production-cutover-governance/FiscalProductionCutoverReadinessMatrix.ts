export class FiscalProductionCutoverReadinessMatrix {
  public static getMatrix() {
    return {
      readinessMatrixGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Consolidação de readiness documental. Não concede autorização real. Não destrava gate real.'
    };
  }
}

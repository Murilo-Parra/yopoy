export class FiscalProductionCanaryAbortNoOpMatrix {
  public static getMatrix() {
    return {
      canaryAbortNoOpMatrixGenerated: true,
      realAbortExecuted: false,
      realRollbackExecuted: false,
      description: 'Modelar abort de canary como no-op. Não executar abort real. Não executar rollback real.'
    };
  }
}

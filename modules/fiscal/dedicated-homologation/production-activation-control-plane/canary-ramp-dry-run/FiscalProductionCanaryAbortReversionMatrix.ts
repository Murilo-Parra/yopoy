export class FiscalProductionCanaryAbortReversionMatrix {
  public static getMatrix() {
    return {
      canaryAbortReversionMatrixGenerated: true,
      realRollbackExecuted: false,
      realTrafficPromoted: false,
      description: 'Modelar abort/reversion do canary como no-op. Não executar abort real. Não executar rollback real.'
    };
  }
}

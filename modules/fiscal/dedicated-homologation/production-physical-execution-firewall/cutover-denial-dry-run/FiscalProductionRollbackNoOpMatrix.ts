export class FiscalProductionRollbackNoOpMatrix {
  public static getMatrix() {
    return {
      rollbackNoOpMatrixGenerated: true,
      realRollbackExecuted: false,
      description: 'Modelar rollback no-op. Não executar rollback real.'
    };
  }
}

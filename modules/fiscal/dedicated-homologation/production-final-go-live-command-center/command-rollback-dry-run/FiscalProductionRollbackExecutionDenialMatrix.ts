export class FiscalProductionRollbackExecutionDenialMatrix {
  public static getMatrix() {
    return {
      rollbackExecutionDenialMatrixGenerated: true,
      realRollbackExecuted: false,
      description: 'Negar rollback real.'
    };
  }
}

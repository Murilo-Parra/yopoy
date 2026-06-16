export class FiscalProductionTransactionBoundaryNoOpenMatrix {
  public static getMatrix() {
    return {
      transactionBoundaryNoOpenMatrixGenerated: true,
      realTransactionOpened: false,
      realTransactionCommitted: false,
      realTransactionRolledBack: false,
      description: 'Modelar fronteira transacional sem abrir transação. Não executar commit ou rollback.'
    };
  }
}

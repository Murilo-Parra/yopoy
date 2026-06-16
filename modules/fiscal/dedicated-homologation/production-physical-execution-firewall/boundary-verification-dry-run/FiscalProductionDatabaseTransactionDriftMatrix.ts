export class FiscalProductionDatabaseTransactionDriftMatrix {
  public static getMatrix() {
    return {
      databaseTransactionDriftMatrixGenerated: true,
      realDatabaseConnected: false,
      realTransactionOpened: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Simular drift de banco/transação. Não conectar banco real. Não abrir transação real.'
    };
  }
}

export class FiscalProductionDatabaseTransactionInterlockMatrix {
  public static getMatrix() {
    return {
      databaseTransactionInterlockMatrixGenerated: true,
      realDatabaseConnected: false,
      realTransactionOpened: false,
      realTransactionCommitted: false,
      realTransactionRolledBack: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Modelar matriz de bloqueio de banco/transações. Não conectar banco real. Não abrir, commitar ou reverter transação real. Não executar DML/DDL.'
    };
  }
}

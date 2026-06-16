export class FiscalProductionDomainNoDatabaseContinuityMatrix {
  public static getMatrix() {
    return {
      domainNoDatabaseContinuityMatrixGenerated: true,
      realDatabaseConnected: false,
      realTransactionOpened: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Consolidar ausência de banco real.'
    };
  }
}

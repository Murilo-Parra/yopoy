export class FiscalProductionDatabaseReentryDenialMatrix {
  public static getMatrix() {
    return {
      databaseReentryDenialMatrixGenerated: true,
      realDatabaseResumed: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Negar retomada de banco.'
    };
  }
}

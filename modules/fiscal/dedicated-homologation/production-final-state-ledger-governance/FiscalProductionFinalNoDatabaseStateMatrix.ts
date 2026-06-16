export class FiscalProductionFinalNoDatabaseStateMatrix {
  public static getMatrix() {
    return {
      finalNoDatabaseStateMatrixGenerated: true,
      realDatabaseConnected: false,
      realDatabaseWritten: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Registrar ausência final de conexão e escrita em banco.'
    };
  }
}

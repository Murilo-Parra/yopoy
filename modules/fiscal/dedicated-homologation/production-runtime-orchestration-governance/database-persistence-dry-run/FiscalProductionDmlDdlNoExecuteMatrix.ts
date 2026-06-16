export class FiscalProductionDmlDdlNoExecuteMatrix {
  public static getMatrix() {
    return {
      dmlDdlNoExecuteMatrixGenerated: true,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Bloquear INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, COMMIT e ROLLBACK.'
    };
  }
}

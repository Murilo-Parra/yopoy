export class FiscalProductionRollbackRecoveryNoOpMatrix {
  public static getMatrix() {
    return {
      rollbackRecoveryNoOpMatrixGenerated: true,
      realDatabaseConnected: false,
      realSefazCalled: false,
      realCertificateLoaded: false,
      description: 'Modelar recuperação pós-rollback como no-op. Não conectar banco, SEFAZ, certificado ou runtime.'
    };
  }
}

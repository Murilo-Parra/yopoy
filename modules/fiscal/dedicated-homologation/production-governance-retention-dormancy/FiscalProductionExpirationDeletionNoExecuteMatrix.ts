export class FiscalProductionExpirationDeletionNoExecuteMatrix {
  public static getMatrix() {
    return {
      expirationDeletionNoExecuteMatrixGenerated: true,
      realDataExpired: false,
      realDataDeleted: false,
      description: 'Bloquear expiração e deleção reais.'
    };
  }
}

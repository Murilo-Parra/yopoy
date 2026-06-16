export class FiscalProductionConsistencyDriftNoVerificationMatrix {
  public static getMatrix() {
    return {
      consistencyDriftNoVerificationMatrixGenerated: true,
      noExternalVerificationOnly: true,
      description: 'Simular drift documental. Não verificar origem real. Não chamar banco, SEFAZ ou API externa.'
    };
  }
}

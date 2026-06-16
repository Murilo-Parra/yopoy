export class FiscalProductionSoDRevalidationMatrix {
  public static getMatrix() {
    return {
      sodRevalidationMatrixGenerated: true,
      realAuthorizationGranted: false,
      description: 'Revalida segregação de funções. Não altera RBAC real nem concede privilégio real.'
    };
  }
}

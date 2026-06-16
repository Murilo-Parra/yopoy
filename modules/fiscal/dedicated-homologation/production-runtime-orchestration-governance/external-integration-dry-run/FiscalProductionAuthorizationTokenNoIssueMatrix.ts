export class FiscalProductionAuthorizationTokenNoIssueMatrix {
  public static getMatrix() {
    return {
      authorizationTokenNoIssueMatrixGenerated: true,
      realAuthorizationTokenIssued: false,
      realAuthorizationGranted: false,
      description: 'Modelar emissão de tokens sem emissão real. Não emitir authorization token real. Não conceder autorização real.'
    };
  }
}

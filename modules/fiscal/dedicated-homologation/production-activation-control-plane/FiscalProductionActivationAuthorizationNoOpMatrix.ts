export class FiscalProductionActivationAuthorizationNoOpMatrix {
  public static getMatrix() {
    return {
      authorizationNoOpMatrixGenerated: true,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      description: 'Modelar matriz de autorização no-op. Não conceder autorização real. Não emitir token real.'
    };
  }
}

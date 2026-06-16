export class FiscalProductionAuthorizationGateDriftMatrix {
  public static getMatrix() {
    return {
      authorizationGateDriftMatrixGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      description: 'Simular drift de gate/autorização/token. Não destravar gate real. Não conceder autorização real. Não emitir token real.'
    };
  }
}

export class FiscalProductionOperationsConsentToActivationNoOpMatrix {
  public static getMatrix() {
    return {
      consentToActivationNoOpMatrixGenerated: true,
      realAuthorizationGranted: false,
      productionV2Activated: false,
      approvedForProductionV2: false,
      description: 'Modelar matriz de consentimento para ativação sem execução. Não converter consentimento em autorização real. Não ativar Produção V2.'
    };
  }
}

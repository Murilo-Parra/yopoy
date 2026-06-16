export class FiscalProductionDomainNoExternalIntegrationContinuityMatrix {
  public static getMatrix() {
    return {
      domainNoExternalIntegrationContinuityMatrixGenerated: true,
      realSefazCalled: false,
      realExternalApiCalled: false,
      realWebhookSent: false,
      description: 'Consolidar ausência de SEFAZ, API externa e webhook real.'
    };
  }
}

export class FiscalProductionFinalNoExternalIntegrationStateMatrix {
  public static getMatrix() {
    return {
      finalNoExternalIntegrationStateMatrixGenerated: true,
      realSefazCalled: false,
      realExternalApiCalled: false,
      realWebhookSent: false,
      description: 'Registrar ausência final de integração externa.'
    };
  }
}

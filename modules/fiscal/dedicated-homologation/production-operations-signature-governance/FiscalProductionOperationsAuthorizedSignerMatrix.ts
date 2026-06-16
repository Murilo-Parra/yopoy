export class FiscalProductionOperationsAuthorizedSignerMatrix {
  public static getMatrix() {
    return {
      authorizedSignerMatrixGenerated: true,
      realCryptographicSignatureCollected: false,
      webhookSent: false,
      emailSent: false,
      description: 'Modelar matriz de signatários autorizados sem notificar ou validar assinatura real. Não coletar assinatura real.'
    };
  }
}

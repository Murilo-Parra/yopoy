export class FiscalProductionExternalIntegrationDriftMatrix {
  public static getMatrix() {
    return {
      externalIntegrationDriftMatrixGenerated: true,
      realSefazCalled: false,
      realCertificateRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Simular drift de SEFAZ, certificados, crypto, XML/PDF e notificações. Não chamar SEFAZ real. Não ler certificados reais.'
    };
  }
}

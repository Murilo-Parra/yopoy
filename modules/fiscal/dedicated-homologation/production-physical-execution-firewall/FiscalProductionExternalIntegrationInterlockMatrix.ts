export class FiscalProductionExternalIntegrationInterlockMatrix {
  public static getMatrix() {
    return {
      externalIntegrationInterlockMatrixGenerated: true,
      realSefazCalled: false,
      realCertificateRead: false,
      realPfxRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Bloquear SEFAZ, certificados, crypto, XML/PDF e notificações.'
    };
  }
}

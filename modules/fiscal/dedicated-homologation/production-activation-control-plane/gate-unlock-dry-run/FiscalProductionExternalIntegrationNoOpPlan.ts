export class FiscalProductionExternalIntegrationNoOpPlan {
  public static getPlan() {
    return {
      externalIntegrationNoOpPlanGenerated: true,
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

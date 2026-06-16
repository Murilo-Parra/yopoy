export class FiscalProductionOperationsExternalIntegrationLockedPlan {
  public static getPlan() {
    return {
      externalIntegrationLockedPlanGenerated: true,
      realSefazCalled: false,
      realCertificateLoaded: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Modelar integrações externas bloqueadas. Não chamar SEFAZ. Não carregar certificado/PFX/senha. Não assinar XML. Não gerar PDF.'
    };
  }
}

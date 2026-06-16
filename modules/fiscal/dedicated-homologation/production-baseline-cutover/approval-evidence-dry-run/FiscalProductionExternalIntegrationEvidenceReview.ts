export class FiscalProductionExternalIntegrationEvidenceReview {
  public static getReview() {
    return {
      externalIntegrationEvidenceReviewGenerated: true,
      realSefazCalled: false,
      realCertificateLoaded: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Revisa integração externa bloqueada. Não chama SEFAZ. Não carrega certificado/PFX/senha. Não assina XML. Não gera PDF real.'
    };
  }
}

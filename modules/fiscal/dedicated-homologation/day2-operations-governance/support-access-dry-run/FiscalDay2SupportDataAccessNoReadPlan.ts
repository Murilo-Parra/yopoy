export class FiscalDay2SupportDataAccessNoReadPlan {
  public static getPlan() {
    return {
      supportDataAccessNoReadPlanGenerated: true,
      realTenantDataAccessed: false,
      realFiscalDocumentAccessed: false,
      realXmlRead: false,
      realPdfRead: false,
      realPfxRead: false,
      realCertificateLoaded: false,
      realSecretRead: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelagem de acesso a dados sem leitura real. Não lê tenant real, XML, PDF, PFX, certificado ou segredo.'
    };
  }
}

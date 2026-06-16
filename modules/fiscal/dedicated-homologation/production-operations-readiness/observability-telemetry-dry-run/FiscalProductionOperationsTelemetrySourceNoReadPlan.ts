export class FiscalProductionOperationsTelemetrySourceNoReadPlan {
  public static getPlan() {
    return {
      telemetrySourceNoReadPlanGenerated: true,
      realTenantDataRead: false,
      realFiscalDocumentRead: false,
      realXmlRead: false,
      realPdfRead: false,
      realPfxRead: false,
      realCertificateRead: false,
      realSecretRead: false,
      description: 'Modelar fontes de telemetria sem leitura real. Não ler tenant data, documento fiscal, XML, PDF, PFX, certificado ou segredo.'
    };
  }
}

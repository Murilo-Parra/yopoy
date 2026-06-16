export class FiscalProductionFiscalDocumentNoReadPlan {
  public static getPlan() {
    return {
      fiscalDocumentNoReadPlanGenerated: true,
      realFiscalDocumentRead: false,
      realXmlRead: false,
      realPdfRead: false,
      realPfxRead: false,
      description: 'Bloquear leitura de XML, PDF, PFX, certificado e documento fiscal.'
    };
  }
}

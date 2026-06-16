export class FiscalProductionRegulatoryAttachmentNoFilePlan {
  public static getPlan() {
    return {
      attachmentNoFilePlanGenerated: true,
      realFilingFileCreated: false,
      realXmlAttached: false,
      realPfxAttached: false,
      description: 'Modelar anexos sem arquivos reais. Não criar arquivo. Não anexar XML/PDF/PFX/certificado.'
    };
  }
}

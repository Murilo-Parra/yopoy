export class FiscalProductionOperationsDataAccessNoReadPlan {
  public static getPlan() {
    return {
      dataAccessNoReadPlanGenerated: true,
      realTenantDataRead: false,
      realFiscalDocumentRead: false,
      realXmlRead: false,
      realPdfRead: false,
      realPfxRead: false,
      realSecretRead: false,
      description: 'Modelar acesso a dados sem leitura real. Não ler tenant data, documento fiscal, XML, PDF, PFX ou segredo.'
    };
  }
}

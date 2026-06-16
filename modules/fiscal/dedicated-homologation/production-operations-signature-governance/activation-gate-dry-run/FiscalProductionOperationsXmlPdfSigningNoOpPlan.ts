export class FiscalProductionOperationsXmlPdfSigningNoOpPlan {
  public static getPlan() {
    return {
      xmlPdfSigningNoOpPlanGenerated: true,
      xmlSigned: false,
      pdfGenerated: false,
      realCryptoUsed: false,
      description: 'Modelar assinatura XML/PDF como no-op. Não assinar XML real. Não gerar PDF real.'
    };
  }
}

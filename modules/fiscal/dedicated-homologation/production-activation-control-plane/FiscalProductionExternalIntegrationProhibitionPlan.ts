export class FiscalProductionExternalIntegrationProhibitionPlan {
  public static getPlan() {
    return {
      externalIntegrationProhibitionPlanGenerated: true,
      realSefazCalled: false,
      realCertificateRead: false,
      realPfxRead: false,
      realSecretRead: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Modelar plano de bloqueio de integrações externas. Não chamar SEFAZ real. Não ler certificado/PFX/segredo. Não assinar XML. Não gerar PDF. Não enviar notificações.'
    };
  }
}

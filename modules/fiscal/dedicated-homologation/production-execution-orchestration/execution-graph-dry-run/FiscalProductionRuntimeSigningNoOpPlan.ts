export class FiscalProductionRuntimeSigningNoOpPlan {
  public static generatePlan() {
    return {
      signingNoOpPlanGenerated: true,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Modelagem da assinatura XML/PDF como no-op. Não carrega certificado, PFX, senha ou crypto real. Não assina XML. Não gera PDF.'
    };
  }
}

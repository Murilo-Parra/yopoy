export class FiscalProductionOperationsCertificateAccessNoReadPlan {
  public static getPlan() {
    return {
      certificateAccessNoReadPlanGenerated: true,
      realCertificateRead: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realSecretRead: false,
      privateKeyRead: false,
      tokenRead: false,
      description: 'Modelar acesso bloqueado a certificado/PFX. Não ler certificado, PFX, senha, chave privada, token ou segredo.'
    };
  }
}

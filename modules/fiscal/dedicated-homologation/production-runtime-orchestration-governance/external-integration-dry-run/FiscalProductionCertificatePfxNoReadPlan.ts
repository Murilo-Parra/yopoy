export class FiscalProductionCertificatePfxNoReadPlan {
  public static getPlan() {
    return {
      certificatePfxNoReadPlanGenerated: true,
      realCertificateRead: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      privateKeyRead: false,
      description: 'Bloquear leitura de certificado, PFX, senha e private key.'
    };
  }
}

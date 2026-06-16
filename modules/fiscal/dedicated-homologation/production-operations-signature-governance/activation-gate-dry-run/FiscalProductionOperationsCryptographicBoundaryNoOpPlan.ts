export class FiscalProductionOperationsCryptographicBoundaryNoOpPlan {
  public static getPlan() {
    return {
      cryptographicBoundaryNoOpPlanGenerated: true,
      realCertificateRead: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      privateKeyRead: false,
      realCryptoUsed: false,
      description: 'Modelar fronteira criptográfica no-op. Não usar certificado, PFX, senha, chave privada ou crypto real.'
    };
  }
}

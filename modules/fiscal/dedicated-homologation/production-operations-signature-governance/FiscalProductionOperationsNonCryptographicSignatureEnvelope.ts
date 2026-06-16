export class FiscalProductionOperationsNonCryptographicSignatureEnvelope {
  public static getEnvelope() {
    return {
      nonCryptographicSignatureEnvelopeGenerated: true,
      realCertificateRead: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realCryptoUsed: false,
      description: 'Modelar envelope de assinatura sem criptografia real. Não usar PFX, certificado, senha, chave privada ou crypto real.'
    };
  }
}

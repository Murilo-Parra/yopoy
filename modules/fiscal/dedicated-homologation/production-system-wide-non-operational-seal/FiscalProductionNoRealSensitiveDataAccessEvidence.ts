export class FiscalProductionNoRealSensitiveDataAccessEvidence {
  public static getEvidence() {
    return {
      noRealSensitiveDataAccessEvidenceGenerated: true,
      realPayloadRead: false,
      tokenRead: false,
      realSecretRead: false,
      realCertificateRead: false,
      realPfxRead: false,
      privateKeyRead: false,
      description: 'Evidenciar ausência de leitura de payload, segredo, certificado, PFX, token e chaves.'
    };
  }
}

export class FiscalProductionOperationsAttestationEvidenceReview {
  public static getReview() {
    return {
      attestationEvidenceReviewGenerated: true,
      realCertificateRead: false,
      realPfxRead: false,
      realSecretRead: false,
      description: 'Revisar evidência de atestado sem acessar documento real. Não ler PDF, XML, PFX, certificado ou segredo real.'
    };
  }
}

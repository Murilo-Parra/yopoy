export class FiscalLegalAuditMockEvidenceSignatureEnvelope {
  public static generateEnvelope() {
    return {
      mockSignatureEnvelopeGenerated: true,
      realSignatureApplied: false,
      legalTrailSigned: false,
      approvalRecordSigned: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      signatureValue: 'mock-signature-envelope',
      description: 'Mock signature envelope simulated. No certificates were loaded or passwords read.'
    };
  }
}

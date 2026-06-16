export class FiscalRealApprovalMockSignatureEnvelope {
  public static generateEnvelope() {
    return {
      mockSignatureEnvelopeGenerated: true,
      realSignatureApplied: false,
      approvalRecordSigned: false,
      signatureEnvelopePersisted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      envelope: {
        hashAlgorithm: 'MOCK_SHA256',
        signatureMethod: 'MOCK_RSA',
        simulated: true,
        reference: 'mock_signature_envelope_no_real_crypto'
      }
    };
  }
}

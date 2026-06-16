export class FiscalRealApprovalMockSigner {
  public static simulateSignature() {
    return {
      mockSignatureSimulated: true,
      realSignatureApplied: false,
      approvalRecordSigned: false,
      xmlSigned: false,
      signature: {
        simulatedValue: 'mock_signature_string_no_crypto_applied',
        mechanism: 'MOCK_SIGNATURE',
        requiresRealCryptoModule: true
      }
    };
  }
}

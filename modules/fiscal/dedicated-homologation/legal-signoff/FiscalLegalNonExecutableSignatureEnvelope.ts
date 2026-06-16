export class FiscalLegalNonExecutableSignatureEnvelope {
  public static generateEnvelope() {
    return {
      signatureEnvelopeGenerated: true,
      executable: false,
      signed: false,
      persisted: false,
      description: 'Model of future signature envelope. Does not include real certificates, PFX, passwords, XML, PDF, or raw payload.'
    };
  }
}

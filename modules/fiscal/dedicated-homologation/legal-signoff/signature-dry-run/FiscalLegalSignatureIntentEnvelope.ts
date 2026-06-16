export class FiscalLegalSignatureIntentEnvelope {
  public static generateEnvelope() {
    return {
      signatureIntentEnvelopeGenerated: true,
      executable: false,
      signed: false,
      persisted: false,
      description: 'Signature intent envelope model. Does not include real certificate, PFX, password, XML, PDF, token or raw payload.'
    };
  }
}

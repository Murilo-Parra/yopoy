export class FiscalProductionNonExecutableAuthorizationEnvelope {
  public static generateEnvelope() {
    return {
      authorizationEnvelopeGenerated: true,
      nonExecutableAuthorizationEnvelopeOnly: true,
      realApprovalRecordPersisted: false,
      description: 'Model of non-executable authorization envelope. Does not sign, send, or persist real approval records.'
    };
  }
}

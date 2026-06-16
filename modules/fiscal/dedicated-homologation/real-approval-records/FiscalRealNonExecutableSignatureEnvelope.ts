export class FiscalRealNonExecutableSignatureEnvelope {
  public static generate() {
    return {
      envelopeId: 'NESE-' + Date.now(),
      generatedAt: new Date().toISOString(),
      envelopePurpose: 'Non-executable simulation of signature gathering.',
      executable: false,
      signed: false,
      persisted: false,
      realSignatureApplied: false,
      realApprovalRecordCreated: false,
      realAuthorizationGranted: false,
      containsCommand: false,
      containsSecret: false,
      containsPayload: false,
      requiresNewExplicitModule: true,
      blockerReason: 'This envelope was explicitly created as non-executable to prevent accidental sign-off in simulation boundaries.'
    };
  }
}

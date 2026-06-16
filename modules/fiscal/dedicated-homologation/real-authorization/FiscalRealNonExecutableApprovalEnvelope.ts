export class FiscalRealNonExecutableApprovalEnvelope {
  public static getEnvelope() {
    return {
      envelopeId: 'ENV-NE-' + Date.now(),
      generatedAt: new Date().toISOString(),
      envelopePurpose: 'Simulation of Authorization Intake ONLY',
      executable: false,
      signed: false,
      persisted: false,
      realAuthorizationGranted: false,
      dualApprovalCompleted: false,
      containsCommand: false,
      containsSecret: false,
      containsPayload: false,
      requiresNewExplicitModule: true,
      blockerReason: 'Módulo 15.1 supports strictly administrative non-executable evaluation.'
    };
  }
}

export class FiscalProductionFirewallNoTokenIssueEvidence {
  public static getEvidence() {
    return {
      noTokenIssueEvidenceGenerated: true,
      realAuthorizationTokenIssued: false,
      tokenRead: false,
      description: 'Evidenciar ausência de token real.'
    };
  }
}

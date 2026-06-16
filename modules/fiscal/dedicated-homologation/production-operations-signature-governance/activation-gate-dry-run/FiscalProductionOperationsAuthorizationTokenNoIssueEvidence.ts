export class FiscalProductionOperationsAuthorizationTokenNoIssueEvidence {
  public static getEvidence() {
    return {
      authorizationTokenNoIssueEvidenceGenerated: true,
      realAuthorizationTokenIssued: false,
      realAuthorizationGranted: false,
      tokenRead: false,
      description: 'Evidenciar ausência de emissão de token/autorização.'
    };
  }
}

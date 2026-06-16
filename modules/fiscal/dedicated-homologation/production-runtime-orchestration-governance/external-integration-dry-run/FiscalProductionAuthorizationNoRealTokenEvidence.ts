export class FiscalProductionAuthorizationNoRealTokenEvidence {
  public static getEvidence() {
    return {
      authorizationNoRealTokenEvidenceGenerated: true,
      realAuthorizationTokenIssued: false,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Evidenciar ausência de token real, autorização real e gate unlock.'
    };
  }
}

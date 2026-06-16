export class FiscalProductionActivationNoRealAuthorizationEvidence {
  public static getEvidence() {
    return {
      noRealAuthorizationEvidenceGenerated: true,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      description: 'Evidenciar ausência de autorização real.'
    };
  }
}

export class FiscalProductionNoRealAuthorizationEvidence {
  public static getEvidence() {
    return {
      noRealAuthorizationEvidenceGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Evidenciar ausência de autorização real.'
    };
  }
}

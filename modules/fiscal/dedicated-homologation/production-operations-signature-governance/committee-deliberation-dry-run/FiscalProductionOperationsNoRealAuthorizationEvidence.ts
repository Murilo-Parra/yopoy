export class FiscalProductionOperationsNoRealAuthorizationEvidence {
  public static getEvidence() {
    return {
      noRealAuthorizationEvidenceGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      description: 'Evidenciar ausência de autorização real.'
    };
  }
}

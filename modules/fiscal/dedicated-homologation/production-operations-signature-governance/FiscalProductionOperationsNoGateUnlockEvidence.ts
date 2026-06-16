export class FiscalProductionOperationsNoGateUnlockEvidence {
  public static getEvidence() {
    return {
      noGateUnlockEvidenceGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      productionV2Activated: false,
      description: 'Evidenciar ausência de destravamento de gate.'
    };
  }
}

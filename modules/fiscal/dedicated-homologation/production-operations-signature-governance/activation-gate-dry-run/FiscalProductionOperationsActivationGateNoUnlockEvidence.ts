export class FiscalProductionOperationsActivationGateNoUnlockEvidence {
  public static getEvidence() {
    return {
      activationGateNoUnlockEvidenceGenerated: true,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Evidenciar ausência de destravamento real de gate.'
    };
  }
}

export class FiscalProductionActivationNoGateUnlockEvidence {
  public static getEvidence() {
    return {
      noGateUnlockEvidenceGenerated: true,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Evidenciar ausência de gate unlock real.'
    };
  }
}

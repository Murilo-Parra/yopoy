export class FiscalProductionGateUnlockNoRealExecutionEvidence {
  public static getEvidence() {
    return {
      gateUnlockNoRealExecutionEvidenceGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      productionV2Activated: false,
      trafficChanged: false,
      description: 'Evidenciar ausência de execução real.'
    };
  }
}

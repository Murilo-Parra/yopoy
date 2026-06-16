export class FiscalProductionFirewallNoGateUnlockEvidence {
  public static getEvidence() {
    return {
      noGateUnlockEvidenceGenerated: true,
      realExecutionGateUnlocked: false,
      activationBlocked: true,
      description: 'Evidenciar ausência de gate unlock real.'
    };
  }
}

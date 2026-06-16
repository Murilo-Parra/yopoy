export class FiscalProductionGateUnlockNoOpEvidence {
  public static generateEvidence() {
    return {
      gateUnlockNoOpEvidenceGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Evidence that the gate remained mechanically locked (no-op). Does not authorize or unlock.'
    };
  }
}

export class FiscalProductionNoRegulatoryGateUnlockEvidence {
  public static getEvidence() {
    return {
      noRegulatoryGateUnlockEvidenceGenerated: true,
      realRegulatoryGateUnlocked: false,
      realExecutionGateUnlocked: false,
      description: 'Evidenciar ausência de regulatory gate unlock real.'
    };
  }
}

export class FiscalProductionFirewallNoRealApprovalEvidence {
  public static getEvidence() {
    return {
      noRealApprovalEvidenceGenerated: true,
      realExecutiveApprovalConcluded: false,
      realApprovalRecordPersisted: false,
      realSignatureCollected: false,
      description: 'Evidenciar ausência de aprovação real.'
    };
  }
}

export class FiscalProductionNoRealRemediationEvidence {
  public static getEvidence() {
    return {
      noRealRemediationEvidenceGenerated: true,
      realRemediationExecuted: false,
      realMitigationExecuted: false,
      realRunbookExecuted: false,
      description: 'Evidenciar ausência de remediação real.'
    };
  }
}

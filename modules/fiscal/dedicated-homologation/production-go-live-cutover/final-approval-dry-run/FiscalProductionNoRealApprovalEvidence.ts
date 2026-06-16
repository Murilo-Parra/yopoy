export class FiscalProductionNoRealApprovalEvidence {
  public static getEvidence() {
    return {
      noRealApprovalEvidenceGenerated: true,
      realGoLiveApproved: false,
      realCutoverApproved: false,
      description: 'Evidenciar ausência de aprovação real.'
    };
  }
}

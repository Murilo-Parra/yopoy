export class FiscalProductionNoReleaseApprovalEvidence {
  public static getEvidence() {
    return {
      noReleaseApprovalEvidenceGenerated: true,
      realReleaseApproved: false,
      realAuthorizationGranted: false,
      description: 'Evidenciar ausência de aprovação real de release.'
    };
  }
}

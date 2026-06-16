export class FiscalProductionOperationsConsentEvidenceReviewMatrix {
  public static getMatrix() {
    return {
      consentEvidenceReviewMatrixGenerated: true,
      realConsentPersisted: false,
      realAuthorizationGranted: false,
      description: 'Revisar evidências de consentimento de modo documental. Não persistir consentimento real. Não converter consentimento em autorização real.'
    };
  }
}

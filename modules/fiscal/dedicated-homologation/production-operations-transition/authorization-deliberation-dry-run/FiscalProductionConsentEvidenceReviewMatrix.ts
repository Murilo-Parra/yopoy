export class FiscalProductionConsentEvidenceReviewMatrix {
  public static getMatrix() {
    return {
      consentEvidenceReviewMatrixGenerated: true,
      dryRunConsentConvertedToRealAuthorization: false,
      realAuthorizationGranted: false,
      description: 'Revisa evidências do módulo 29.2. Não converte consentimento dry-run em autorização real.'
    };
  }
}

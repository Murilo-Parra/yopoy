export class FiscalProductionConsentSeparationOfDutiesReview {
  public static getReview() {
    return {
      separationOfDutiesReviewGenerated: true,
      realAuthorizationGranted: false,
      description: 'Revisa segregação de funções. Não altera RBAC real nem concede privilégio real.'
    };
  }
}

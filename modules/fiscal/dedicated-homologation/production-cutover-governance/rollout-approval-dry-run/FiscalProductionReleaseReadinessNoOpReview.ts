export class FiscalProductionReleaseReadinessNoOpReview {
  public static getReview() {
    return {
      releaseReadinessNoOpReviewGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Revisão de readiness em modo documental. Não concede autorização real. Não destrava gate real.'
    };
  }
}

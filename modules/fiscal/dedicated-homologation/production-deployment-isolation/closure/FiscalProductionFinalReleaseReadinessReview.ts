export class FiscalProductionFinalReleaseReadinessReview {
  public static generateReview() {
    return {
      finalReadinessReviewGenerated: true,
      go: false,
      noGo: true,
      approvedForRealRelease: false,
      approvedForProductionV2: false,
      description: 'Modeled final release readiness review. Does not grant real productive authorization.'
    };
  }
}

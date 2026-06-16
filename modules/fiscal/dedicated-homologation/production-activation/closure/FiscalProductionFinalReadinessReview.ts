export class FiscalProductionFinalReadinessReview {
  public static generateReview() {
    return {
      finalReadinessReviewGenerated: true,
      go: false,
      noGo: true,
      productionV2Activated: false,
      activationBlocked: true,
      description: 'Consolidated final documental readiness. Returns noGo for real activation. Missing new explicit gates for any future operational activation.'
    };
  }
}

export class FiscalProductionLockedGateReadinessReview {
  public static generateReview() {
    return {
      lockedGateReadinessReviewGenerated: true,
      realExecutionGateUnlocked: false,
      activationBlocked: true,
      description: 'Reviews readiness of the gate without unlocking it. Keeps execution blocked.'
    };
  }
}

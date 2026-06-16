export class FiscalLegalRiskAcceptanceReview {
  public static simulateReview() {
    return {
      riskAcceptanceReviewGenerated: true,
      realRiskAccepted: false,
      description: 'Documentary risk acceptance review. Real risk is not accepted. No operational authorization granted. Gate is not changed. Production V2 is not activated.'
    };
  }
}

export class FiscalProductionRiskAcceptanceNoOpReview {
  public static getReview() {
    return {
      riskAcceptanceNoOpReviewGenerated: true,
      realRiskAccepted: false,
      realWaiverGranted: false,
      description: 'Modelagem de aceite de risco como no-op. Não aceita risco real nem concede waiver real.'
    };
  }
}

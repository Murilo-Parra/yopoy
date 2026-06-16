export class FiscalProductionOperationsRiskAcceptanceNoOpReview {
  public static getReview() {
    return {
      riskAcceptanceNoOpReviewGenerated: true,
      realRiskAccepted: false,
      description: 'Modelar aceite de risco como no-op. Não aceitar risco real.'
    };
  }
}

export class FiscalProductionActivationRiskAcceptanceNoOpReview {
  public static simulate() {
    return {
      riskAcceptanceNoOpReviewGenerated: true,
      realRiskAccepted: false,
      description: 'Modelar aceite de risco como no-op. Não aceitar risco real.'
    };
  }
}

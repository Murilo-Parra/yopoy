export class FiscalProductionGatePreconditionReview {
  public static getReview() {
    return {
      gatePreconditionReviewGenerated: true,
      realExecutionGateUnlocked: false,
      activationBlocked: true,
      description: 'Revisa pré-condições do gate de forma documental. Não destrava gate real.'
    };
  }
}

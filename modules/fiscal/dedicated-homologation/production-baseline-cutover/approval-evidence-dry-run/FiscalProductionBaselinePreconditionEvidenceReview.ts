export class FiscalProductionBaselinePreconditionEvidenceReview {
  public static getReview() {
    return {
      preconditionEvidenceReviewGenerated: true,
      realCutoverApproved: false,
      activationBlocked: true,
      description: 'Revisa evidências das pré-condições. Não aprova cutover real.'
    };
  }
}

export class FiscalProductionOperationsWaiverNoOpReview {
  public static getReview() {
    return {
      waiverNoOpReviewGenerated: true,
      realWaiverGranted: false,
      description: 'Modelar waiver como no-op. Não conceder waiver real.'
    };
  }
}

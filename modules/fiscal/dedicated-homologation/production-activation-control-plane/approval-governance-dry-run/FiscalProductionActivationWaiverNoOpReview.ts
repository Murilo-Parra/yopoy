export class FiscalProductionActivationWaiverNoOpReview {
  public static simulate() {
    return {
      waiverNoOpReviewGenerated: true,
      realWaiverGranted: false,
      description: 'Modelar waiver como no-op. Não conceder waiver real.'
    };
  }
}

export class FiscalProductionV2LockedEvidenceReview {
  public static getReview() {
    return {
      v2LockedEvidenceReviewGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      v2HandlerCalled: false,
      description: 'Revisa evidência de V2 travada. Não ativa Produção V2. Não ativa routeToV2.'
    };
  }
}

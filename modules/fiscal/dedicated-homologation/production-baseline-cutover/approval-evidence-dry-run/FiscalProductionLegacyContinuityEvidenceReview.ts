export class FiscalProductionLegacyContinuityEvidenceReview {
  public static getReview() {
    return {
      legacyContinuityEvidenceReviewGenerated: true,
      routeToLegacy: true,
      legacyHandlerCalled: false,
      description: 'Revisa continuidade legada. Mantém rota legada obrigatória. Não chama handler legado como side-effect.'
    };
  }
}

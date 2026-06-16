export class FiscalProductionOperationsCommitteeFinalRecommendation {
  public static getRecommendation() {
    return {
      committeeFinalRecommendationGenerated: true,
      approvedForProductionV2: false,
      approvedForRouteToV2: false,
      productionV2Activated: false,
      description: 'Gerar recomendação final simulada. Não aprovar Produção V2. Não liberar routeToV2.'
    };
  }
}

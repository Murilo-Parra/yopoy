export class FiscalProductionReleaseHoldNoActivationPlan {
  public static getPlan() {
    return {
      releaseHoldNoActivationPlanGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Modelar release hold sem ativação. Não ativar Produção V2. Não alterar routeToV2.'
    };
  }
}

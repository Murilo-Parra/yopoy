export class FiscalProductionOperationsTransitionNoActivationPlan {
  public static getPlan() {
    return {
      transitionNoActivationPlanGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Modelar transição operacional sem ativação. Não ativar Produção V2. Não promover routeToV2.'
    };
  }
}

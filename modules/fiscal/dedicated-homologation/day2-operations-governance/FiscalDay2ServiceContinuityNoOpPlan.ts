export class FiscalDay2ServiceContinuityNoOpPlan {
  public static getPlan() {
    return {
      serviceContinuityNoOpPlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      productionV2Activated: false,
      description: 'Modelagem de continuidade de serviço como no-op. Preserva legado ativo. Não ativa V2.'
    };
  }
}

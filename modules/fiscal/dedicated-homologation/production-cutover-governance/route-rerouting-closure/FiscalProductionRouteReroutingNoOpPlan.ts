export class FiscalProductionRouteReroutingNoOpPlan {
  public static getPlan() {
    return {
      reroutingNoOpPlanGenerated: true,
      realRouteReroutingExecuted: false,
      routeToV2: false,
      productionV2Activated: false,
      description: 'Modelagem do plano de re-routing final como no-op. Não executa re-routing real. Não ativa V2.'
    };
  }
}

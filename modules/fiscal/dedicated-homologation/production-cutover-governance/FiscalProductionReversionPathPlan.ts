export class FiscalProductionReversionPathPlan {
  public static getPlan() {
    return {
      reversionPathPlanGenerated: true,
      realRollbackExecuted: false,
      routeToLegacy: true,
      description: 'Modelagem do caminho de reversão. Não executa rollback real. Não altera rota real.'
    };
  }
}

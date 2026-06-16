export class FiscalProductionQueryRunnerNoExecutePlan {
  public static getPlan() {
    return {
      queryRunnerNoExecutePlanGenerated: true,
      realQueryExecuted: false,
      realQueryRunnerExecuted: false,
      description: 'Modelar query runner sem execução. Não executar SQL real.'
    };
  }
}

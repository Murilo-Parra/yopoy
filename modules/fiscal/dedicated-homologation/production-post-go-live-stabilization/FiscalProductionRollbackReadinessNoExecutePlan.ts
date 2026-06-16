export class FiscalProductionRollbackReadinessNoExecutePlan {
  public static getPlan() {
    return {
      rollbackReadinessNoExecutePlanGenerated: true,
      realRollbackExecuted: false,
      realAbortExecuted: false,
      description: 'Modelar prontidão de rollback sem execução. Não executar rollback real. Não executar abort real.'
    };
  }
}

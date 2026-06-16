export class FiscalProductionReversibleGoLiveNoOpPlan {
  public static getPlan() {
    return {
      reversibleGoLiveNoOpPlanGenerated: true,
      realGoLiveExecuted: false,
      realRollbackExecuted: false,
      description: 'Modelagem de go-live reversível como no-op. Não executa go-live real nem rollback real.'
    };
  }
}

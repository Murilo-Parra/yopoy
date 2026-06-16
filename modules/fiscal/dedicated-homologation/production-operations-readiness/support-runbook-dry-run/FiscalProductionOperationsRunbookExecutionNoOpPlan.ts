export class FiscalProductionOperationsRunbookExecutionNoOpPlan {
  public static getPlan() {
    return {
      runbookExecutionNoOpPlanGenerated: true,
      realRunbookExecuted: false,
      realMitigationExecuted: false,
      description: 'Modelar execução de runbook como no-op. Não executar mitigação real.'
    };
  }
}

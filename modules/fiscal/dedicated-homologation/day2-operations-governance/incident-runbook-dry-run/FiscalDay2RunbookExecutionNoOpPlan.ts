export class FiscalDay2RunbookExecutionNoOpPlan {
  public static getPlan() {
    return {
      runbookExecutionNoOpPlanGenerated: true,
      realRunbookExecuted: false,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      realWorkerDispatched: false,
      shellCommandExecuted: false,
      description: 'Modelagem de execução de runbook como no-op. Não executa runbook real. Não inicia runtime/queue/worker/shell.'
    };
  }
}

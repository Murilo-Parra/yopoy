export class FiscalProductionRuntimeExecutionProhibitionPlan {
  public static getPlan() {
    return {
      runtimeExecutionProhibitionPlanGenerated: true,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      realJobEnqueued: false,
      realWorkerDispatched: false,
      description: 'Modelar plano de proibição de runtime real. Não iniciar queue, worker, scheduler, cron, command runner ou shell.'
    };
  }
}

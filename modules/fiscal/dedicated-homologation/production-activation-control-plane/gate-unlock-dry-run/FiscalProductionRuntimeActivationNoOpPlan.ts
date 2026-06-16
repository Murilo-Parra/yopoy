export class FiscalProductionRuntimeActivationNoOpPlan {
  public static getPlan() {
    return {
      runtimeActivationNoOpPlanGenerated: true,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      realJobEnqueued: false,
      realWorkerDispatched: false,
      description: 'Bloquear runtime, queue, jobs e workers.'
    };
  }
}

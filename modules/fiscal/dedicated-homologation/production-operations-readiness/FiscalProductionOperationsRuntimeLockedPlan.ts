export class FiscalProductionOperationsRuntimeLockedPlan {
  public static getPlan() {
    return {
      runtimeLockedPlanGenerated: true,
      runtimeExecutionStarted: false,
      realJobEnqueued: false,
      workersCreated: false,
      description: 'Modelar runtime travado. Não criar queue, job, worker, scheduler ou cron.'
    };
  }
}

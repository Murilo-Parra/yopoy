export class FiscalProductionRuntimeExecutionLockedPlan {
  public static getPlan() {
    return {
      runtimeExecutionLockedPlanGenerated: true,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      workersCreated: false,
      description: 'Declara runtime bloqueado. Não cria queue, worker, job, scheduler ou cron.'
    };
  }
}

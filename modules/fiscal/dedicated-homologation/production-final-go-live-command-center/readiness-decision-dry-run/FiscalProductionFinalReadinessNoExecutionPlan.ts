export class FiscalProductionFinalReadinessNoExecutionPlan {
  public static getPlan() {
    return {
      noExecutionPlanGenerated: true,
      realRuntimeStarted: false,
      description: 'Reforçar que readiness não inicia runtime/queue/job/worker/scheduler/cron/shell.'
    };
  }
}

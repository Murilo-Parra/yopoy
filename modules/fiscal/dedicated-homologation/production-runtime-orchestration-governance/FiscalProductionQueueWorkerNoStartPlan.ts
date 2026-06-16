export class FiscalProductionQueueWorkerNoStartPlan {
  public static getPlan() {
    return {
      queueWorkerNoStartPlanGenerated: true,
      realQueueStarted: false,
      realWorkerDispatched: false,
      description: 'Documentar que queues e workers não são iniciados.'
    };
  }
}

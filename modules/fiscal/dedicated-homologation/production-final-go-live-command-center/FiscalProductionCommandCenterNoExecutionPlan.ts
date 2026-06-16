export class FiscalProductionCommandCenterNoExecutionPlan {
  public static getPlan() {
    return {
      commandCenterNoExecutionPlanGenerated: true,
      realRuntimeStarted: false,
      description: 'Impedir runtime, queue, job, worker, scheduler, cron, shell, command runner, process manager e lifecycle runner reais.'
    };
  }
}

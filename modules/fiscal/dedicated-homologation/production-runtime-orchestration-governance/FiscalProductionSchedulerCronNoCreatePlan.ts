export class FiscalProductionSchedulerCronNoCreatePlan {
  public static getPlan() {
    return {
      schedulerCronNoCreatePlanGenerated: true,
      realSchedulerCreated: false,
      realCronCreated: false,
      description: 'Modelar scheduler e cron sem criação real.'
    };
  }
}

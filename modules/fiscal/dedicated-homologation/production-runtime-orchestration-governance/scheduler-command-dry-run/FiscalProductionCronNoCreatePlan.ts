export class FiscalProductionCronNoCreatePlan {
  public static getPlan() {
    return {
      cronNoCreatePlanGenerated: true,
      realCronCreated: false,
      description: 'Modelar cron expressions apenas como metadados administrativos. Não criar cron real. Não ativar agenda real.'
    };
  }
}

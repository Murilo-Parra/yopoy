export class FiscalProductionRecurringTaskNoRegisterPlan {
  public static getPlan() {
    return {
      recurringTaskNoRegisterPlanGenerated: true,
      realRecurringTaskRegistered: false,
      description: 'Modelar recurring tasks sem registro real. Não criar agendamento recorrente real.'
    };
  }
}

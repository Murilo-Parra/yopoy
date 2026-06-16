export class FiscalProductionSchedulerNoCreateBlueprint {
  public static getBlueprint() {
    return {
      schedulerNoCreateBlueprintGenerated: true,
      realSchedulerCreated: false,
      realRecurringTaskRegistered: false,
      description: 'Modelar a futura arquitetura de schedulers produtivos. Não criar scheduler real. Não registrar recurring task real.'
    };
  }
}

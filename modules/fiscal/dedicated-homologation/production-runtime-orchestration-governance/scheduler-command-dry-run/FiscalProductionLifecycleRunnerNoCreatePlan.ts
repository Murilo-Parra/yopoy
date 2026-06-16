export class FiscalProductionLifecycleRunnerNoCreatePlan {
  public static getPlan() {
    return {
      lifecycleRunnerNoCreatePlanGenerated: true,
      realLifecycleRunnerCreated: false,
      description: 'Modelar lifecycle runners sem criação real. Não chamar lifecycle hook real.'
    };
  }
}

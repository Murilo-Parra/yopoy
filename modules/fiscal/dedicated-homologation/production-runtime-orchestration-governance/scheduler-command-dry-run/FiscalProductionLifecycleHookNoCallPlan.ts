export class FiscalProductionLifecycleHookNoCallPlan {
  public static getPlan() {
    return {
      lifecycleHookNoCallPlanGenerated: true,
      realLifecycleHookCalled: false,
      description: 'Modelar lifecycle hooks sem chamada real. Não chamar startup/shutdown hooks reais.'
    };
  }
}

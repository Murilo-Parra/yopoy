export class FiscalProductionCanaryActivationPlan {
  public static generatePlan() {
    return {
      canaryPlanGenerated: true,
      canaryActivated: false,
      description: 'Canary activation modeled by tenant/company. No real canary or interceptor installed.'
    };
  }
}

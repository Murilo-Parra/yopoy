export class FiscalProductionCanaryRoutingNoActivationPlan {
  public static getPlan() {
    return {
      canaryRoutingNoActivationPlanGenerated: true,
      realCanaryRoutingActivated: false,
      realCanaryActivated: false,
      description: 'Modelar canary routing sem ativação real.'
    };
  }
}

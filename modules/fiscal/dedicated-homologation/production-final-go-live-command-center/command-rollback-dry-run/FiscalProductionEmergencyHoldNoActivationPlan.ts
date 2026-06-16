export class FiscalProductionEmergencyHoldNoActivationPlan {
  public static getPlan() {
    return {
      emergencyHoldNoActivationPlanGenerated: true,
      activationBlocked: true,
      productionV2Activated: false,
      description: 'Simular emergency hold sem ativar gates, tokens ou produção V2.'
    };
  }
}

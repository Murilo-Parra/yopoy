export class FiscalProductionReversibleActivationPlan {
  public static generatePlan() {
    return {
      reversibleActivationPlanGenerated: true,
      reversibleActivationSimulationOnly: true,
      reversibleActivationExecuted: false,
      productionV2Activated: false,
      approvedForProductionV2: false,
      description: 'Documentary modeled future reversible activation. No real activation or execution occurs.'
    };
  }
}

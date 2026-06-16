export class FiscalProductionReversibleActivationPlan {
  public static generatePlan() {
    return {
      reversibleActivationPlanGenerated: true,
      productionV2Activated: false,
      trafficChanged: false,
      rollbackExecuted: false,
      killSwitchInstalled: false,
      description: 'Model of future reversible activation. Real production V2 remains inactive.'
    };
  }
}

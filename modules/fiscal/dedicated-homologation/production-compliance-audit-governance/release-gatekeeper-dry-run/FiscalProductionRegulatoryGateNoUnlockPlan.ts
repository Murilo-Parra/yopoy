export class FiscalProductionRegulatoryGateNoUnlockPlan {
  public static getPlan() {
    return {
      regulatoryGateNoUnlockPlanGenerated: true,
      realRegulatoryGateUnlocked: false,
      realExecutionGateUnlocked: false,
      description: 'Modelar plano de gate sem unlock real.'
    };
  }
}

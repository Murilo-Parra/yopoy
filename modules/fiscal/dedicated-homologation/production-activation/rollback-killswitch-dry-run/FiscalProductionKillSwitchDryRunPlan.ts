export class FiscalProductionKillSwitchDryRunPlan {
  public static generatePlan() {
    return {
      killSwitchPlanGenerated: true,
      killSwitchInstalled: false,
      killSwitchActivated: false,
      description: 'Model of future production kill-switch. No middleware, tap, worker, or scheduler installed.'
    };
  }
}

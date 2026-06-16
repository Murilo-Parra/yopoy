export class FiscalProductionRollbackDryRunPlan {
  public static generatePlan() {
    return {
      rollbackPlanGenerated: true,
      rollbackExecuted: false,
      trafficChanged: false,
      routeToLegacy: true,
      description: 'Simulated rollback plan in case of V2 failure. No real rollback was executed, legacy handler not called as side-effect, and app.use was not modified.'
    };
  }
}

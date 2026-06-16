export class FiscalProductionRollbackGovernancePlan {
  public static generatePlan() {
    return {
      rollbackGovernancePlanGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      routeToLegacy: true,
      description: 'Modeled governance for future rollback. No real rollback or traffic changes will occur.'
    };
  }
}

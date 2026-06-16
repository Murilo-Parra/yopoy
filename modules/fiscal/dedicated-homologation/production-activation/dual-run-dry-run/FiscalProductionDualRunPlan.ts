export class FiscalProductionDualRunPlan {
  public static generatePlan() {
    return {
      dualRunPlanGenerated: true,
      dualRunExecuted: false,
      realTrafficDuplicated: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Model of future dual-run between Legacy and V2. Real dual-run not executed, no traffic duplicated, real handlers not called.'
    };
  }
}

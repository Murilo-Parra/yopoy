export class FiscalRouteShadowRollbackPlan {
  public static generatePlan() {
    return {
      shadowRollbackPlanGenerated: true,
      shadowRollbackExecuted: false,
      canaryActivated: false,
      trafficChanged: false,
      routeToLegacy: true,
      description: 'Administrative plan for shadow rollback. No real execution.'
    };
  }
}

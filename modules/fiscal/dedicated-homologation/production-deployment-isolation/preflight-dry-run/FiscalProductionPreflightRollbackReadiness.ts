export class FiscalProductionPreflightRollbackReadiness {
  public static generateReadiness() {
    return {
      rollbackReadinessGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      routeToLegacy: true,
      description: 'Modeled documentary rollback readiness. No rollback is actually executed.'
    };
  }
}

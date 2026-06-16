export class FiscalProductionCanaryRollbackReadiness {
  public static generateReadiness() {
    return {
      rollbackReadinessGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      routeToLegacy: true,
      description: 'Rollback readiness validation. Real rollback not executed, traffic continues to legacy.'
    };
  }
}

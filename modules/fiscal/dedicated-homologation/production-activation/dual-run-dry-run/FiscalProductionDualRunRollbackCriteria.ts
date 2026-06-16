export class FiscalProductionDualRunRollbackCriteria {
  public static generateCriteria() {
    return {
      rollbackCriteriaGenerated: true,
      rollbackExecuted: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Consolidated rollback criteria during dual-run. Real rollback not executed.'
    };
  }
}

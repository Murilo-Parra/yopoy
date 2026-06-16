export class FiscalProductionCanaryAbortCriteria {
  public static generateCriteria() {
    return {
      canaryAbortCriteriaGenerated: true,
      canaryActivated: false,
      realRollbackExecuted: false,
      trafficChanged: false,
      description: 'Modeled documentary canary abort criteria. No canary, rollback or traffic shifts happen.'
    };
  }
}

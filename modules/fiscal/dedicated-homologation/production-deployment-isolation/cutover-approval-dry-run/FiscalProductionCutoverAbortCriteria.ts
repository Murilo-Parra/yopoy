export class FiscalProductionCutoverAbortCriteria {
  public static generateCriteria() {
    return {
      cutoverAbortCriteriaGenerated: true,
      realRollbackExecuted: false,
      realCutoverApproved: false,
      routeToV2: false,
      description: 'Abort criteria modeled without real rollback or cutover mechanisms attached.'
    };
  }
}

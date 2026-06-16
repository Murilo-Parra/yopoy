export class FiscalRouteCutoverAbortCriteria {
  public static generateCriteria() {
    return {
      abortCriteriaGenerated: true,
      cutoverExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Criteria mapping for transition abort. No real abort execution.'
    };
  }
}

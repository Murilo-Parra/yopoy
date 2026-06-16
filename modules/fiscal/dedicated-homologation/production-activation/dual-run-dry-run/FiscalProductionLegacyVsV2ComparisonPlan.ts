export class FiscalProductionLegacyVsV2ComparisonPlan {
  public static generatePlan() {
    return {
      comparisonPlanGenerated: true,
      v2HandlerCalled: false,
      legacyHandlerCalledAsSideEffect: false,
      syntheticMetricsReady: true,
      description: 'Model of future comparison between Legacy and V2 responses. Native handlers were not called. No real payloads compared.'
    };
  }
}

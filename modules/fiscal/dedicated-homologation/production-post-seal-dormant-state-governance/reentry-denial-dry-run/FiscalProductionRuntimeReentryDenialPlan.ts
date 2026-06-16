export class FiscalProductionRuntimeReentryDenialPlan {
  public static getPlan() {
    return {
      runtimeReentryDenialPlanGenerated: true,
      realRuntimeResumed: false,
      realRuntimeStarted: false,
      description: 'Negar retomada de runtime.'
    };
  }
}

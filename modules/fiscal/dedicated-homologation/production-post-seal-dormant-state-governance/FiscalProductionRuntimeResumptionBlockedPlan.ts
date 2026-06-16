export class FiscalProductionRuntimeResumptionBlockedPlan {
  public static getPlan() {
    return {
      runtimeResumptionBlockedPlanGenerated: true,
      realRuntimeResumed: false,
      realRuntimeStarted: false,
      description: 'Bloquear retomada de runtime.'
    };
  }
}

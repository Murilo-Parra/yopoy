export class FiscalProductionRuntimeDriftNoDetectRealPlan {
  public static getPlan() {
    return {
      runtimeDriftPlanGenerated: true,
      realRuntimeDriftDetected: false,
      description: 'Verificação documental de runtime (sem scan real).'
    };
  }
}

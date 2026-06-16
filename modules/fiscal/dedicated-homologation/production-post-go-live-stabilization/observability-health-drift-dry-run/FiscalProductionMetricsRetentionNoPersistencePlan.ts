export class FiscalProductionMetricsRetentionNoPersistencePlan {
  public static getPlan() {
    return {
      metricsRetentionNoPersistencePlanGenerated: true,
      realMetricsPersisted: false,
      fileSystemWritten: false,
      description: 'Modelar retenção de métricas sem persistência. Não gravar filesystem, banco ou storage.'
    };
  }
}

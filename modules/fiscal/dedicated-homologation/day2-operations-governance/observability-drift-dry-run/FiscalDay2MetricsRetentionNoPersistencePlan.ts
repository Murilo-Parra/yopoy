export class FiscalDay2MetricsRetentionNoPersistencePlan {
  public static getPlan() {
    return {
      metricsRetentionNoPersistencePlanGenerated: true,
      realMetricsPersisted: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Modelagem de retenção de métricas sem persistência produtiva. Não grava em banco real. Não executa DML/DDL.'
    };
  }
}

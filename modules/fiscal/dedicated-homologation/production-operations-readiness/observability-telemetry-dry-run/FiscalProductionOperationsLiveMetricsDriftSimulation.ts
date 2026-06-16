export class FiscalProductionOperationsLiveMetricsDriftSimulation {
  public static getSimulation() {
    return {
      liveMetricsDriftSimulationGenerated: true,
      realPrometheusConnected: false,
      realGrafanaConnected: false,
      realDatadogConnected: false,
      realNewRelicConnected: false,
      description: 'Modelar drift de métricas ao vivo como simulação. Não conectar Prometheus, Grafana, Datadog ou New Relic.'
    };
  }
}

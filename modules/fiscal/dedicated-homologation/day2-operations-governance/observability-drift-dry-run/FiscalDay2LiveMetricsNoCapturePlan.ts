export class FiscalDay2LiveMetricsNoCapturePlan {
  public static getPlan() {
    return {
      liveMetricsNoCapturePlanGenerated: true,
      realMetricsCaptured: false,
      realTelemetryRead: false,
      prometheusConnected: false,
      grafanaConnected: false,
      datadogConnected: false,
      newRelicConnected: false,
      openTelemetryConnected: false,
      lokiConnected: false,
      cloudWatchConnected: false,
      description: 'Modelagem de plano de métricas ao vivo sem captura real. Não conecta tool real. Não lê telemetria real.'
    };
  }
}

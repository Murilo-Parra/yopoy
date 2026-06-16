export class FiscalRealObservabilityBlueprint {
  public static getBlueprint() {
    return {
      logSink: 'Datadog / CloudWatch / ELK',
      metricSink: 'Prometheus / Datadog',
      traceSink: 'OpenTelemetry',
      alertingPolicy: 'Slack/PagerDuty em caso de falha SEFAZ ou expiração de certificado',
      dashboardPolicy: 'Dashboard unificado de latência FISCAL-V2-HOMOLOG',
      observabilityActivated: false,
      workerCreated: false,
      schedulerCreated: false
    };
  }
}

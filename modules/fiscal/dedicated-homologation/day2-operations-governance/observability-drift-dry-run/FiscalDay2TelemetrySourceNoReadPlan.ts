export class FiscalDay2TelemetrySourceNoReadPlan {
  public static getPlan() {
    return {
      telemetrySourceNoReadPlanGenerated: true,
      realTelemetryRead: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelagem de fontes de telemetria sem leitura real. Não acessa logs, métricas, traces, request, response ou payload real.'
    };
  }
}

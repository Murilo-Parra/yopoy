export class FiscalProductionOperationsTelemetryNoCapturePlan {
  public static getPlan() {
    return {
      telemetryNoCapturePlanGenerated: true,
      realMetricsCaptured: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      description: 'Modelar plano de telemetria sem captura. Não capturar request, response, payload ou métricas reais.'
    };
  }
}

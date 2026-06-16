export class FiscalProductionOperationalHealthNoCaptureMatrix {
  public static getMatrix() {
    return {
      operationalHealthNoCaptureMatrixGenerated: true,
      realMetricsCaptured: false,
      realPayloadCaptured: false,
      description: 'Modelar health check sem captura real. Não capturar métricas, logs, traces, request, response ou payload.'
    };
  }
}

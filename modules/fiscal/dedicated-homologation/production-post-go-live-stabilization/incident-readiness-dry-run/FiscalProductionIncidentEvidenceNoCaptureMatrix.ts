export class FiscalProductionIncidentEvidenceNoCaptureMatrix {
  public static getMatrix() {
    return {
      incidentEvidenceNoCaptureMatrixGenerated: true,
      realMetricsCaptured: false,
      realLogsCaptured: false,
      realTracesCaptured: false,
      realPayloadCaptured: false,
      description: 'Modelar evidências de incidente sem captura real. Não capturar métricas, logs, traces, request, response ou payload.'
    };
  }
}

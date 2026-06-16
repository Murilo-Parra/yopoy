export class FiscalDay2IncidentTriageMatrix {
  public static getMatrix() {
    return {
      incidentTriageMatrixGenerated: true,
      realEndpointCalled: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      description: 'Modelagem de matriz de triagem de incidentes. Não chama handler real. Não captura request/response/payload.'
    };
  }
}

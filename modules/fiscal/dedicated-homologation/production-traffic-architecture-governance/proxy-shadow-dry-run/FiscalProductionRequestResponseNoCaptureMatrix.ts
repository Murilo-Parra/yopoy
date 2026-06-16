export class FiscalProductionRequestResponseNoCaptureMatrix {
  public static getMatrix() {
    return {
      requestResponseNoCaptureMatrixGenerated: true,
      realRequestCaptured: false,
      realResponseCaptured: false,
      description: 'Consolidar ausência de captura de request/response.'
    };
  }
}

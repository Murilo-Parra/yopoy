export class FiscalProductionFinalNoRuntimeStateMatrix {
  public static getMatrix() {
    return {
      finalNoRuntimeStateMatrixGenerated: true,
      realRuntimeStarted: false,
      realQueueStarted: false,
      realWorkerDispatched: false,
      description: 'Registrar ausência final de runtime.'
    };
  }
}

export class FiscalProductionPostAbortContinuityMatrix {
  public static getMatrix() {
    return {
      postAbortContinuityMatrixGenerated: true,
      routeToLegacy: true,
      productionV2Activated: false,
      description: 'Modelar continuidade pós-abort sem mutação produtiva. Preservar legado e bloquear V2.'
    };
  }
}

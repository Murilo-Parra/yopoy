export class FiscalProductionFinalCommandNoExecuteMatrix {
  public static getMatrix() {
    return {
      finalCommandNoExecuteMatrixGenerated: true,
      realFinalCommandExecuted: false,
      realGoLiveExecuted: false,
      productionV2Activated: false,
      description: 'Bloquear comando final real.'
    };
  }
}

export class FiscalProductionDormantStateContinuityMatrix {
  public static getMatrix() {
    return {
      dormantStateContinuityMatrixGenerated: true,
      activationBlocked: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Manter continuidade do estado dormente.'
    };
  }
}

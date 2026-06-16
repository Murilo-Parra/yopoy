export class FiscalProductionNoActivationDecisionMatrix {
  public static getMatrix() {
    return {
      noActivationDecisionMatrixGenerated: true,
      productionV2Activated: false,
      activationBlocked: true,
      description: 'Modelar decisão final sem ativação. Forçar go false e noGo true.'
    };
  }
}

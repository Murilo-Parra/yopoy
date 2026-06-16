export class FiscalProductionNonBindingDecisionMatrix {
  public static getMatrix() {
    return {
      nonBindingDecisionMatrixGenerated: true,
      go: false,
      noGo: true,
      activationBlocked: true,
      description: 'Consolidar decisão simulada e não vinculante.'
    };
  }
}

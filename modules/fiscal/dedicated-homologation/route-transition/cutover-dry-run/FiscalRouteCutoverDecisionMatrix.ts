export class FiscalRouteCutoverDecisionMatrix {
  public static generateMatrix() {
    return {
      decisionMatrixGenerated: true,
      go: false,
      noGo: true,
      approvedForRealRouteCutover: false,
      approvedForProductionV2: false,
      description: 'Administrative decision consolidation for cutover. Real cutover returns noGo.'
    };
  }
}

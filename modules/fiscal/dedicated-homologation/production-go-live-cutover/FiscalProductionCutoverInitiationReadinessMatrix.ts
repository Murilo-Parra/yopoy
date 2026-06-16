export class FiscalProductionCutoverInitiationReadinessMatrix {
  public static getMatrix() {
    return {
      cutoverInitiationReadinessMatrixGenerated: true,
      realCutoverExecuted: false,
      productionV2Activated: false,
      description: 'Modelar readiness de início de cutover por metadados. Não aprovar cutover real.'
    };
  }
}

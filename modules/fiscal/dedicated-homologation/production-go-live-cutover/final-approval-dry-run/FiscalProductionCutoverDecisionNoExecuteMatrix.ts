export class FiscalProductionCutoverDecisionNoExecuteMatrix {
  public static getMatrix() {
    return {
      cutoverDecisionNoExecuteMatrixGenerated: true,
      realCutoverApproved: false,
      realCutoverExecuted: false,
      description: 'Modelar decisão de cutover sem execução. Não executar cutover real.'
    };
  }
}

export class FiscalProductionBaselineCutoverPreconditionMatrix {
  public static getMatrix() {
    return {
      preconditionMatrixGenerated: true,
      realCutoverExecuted: false,
      activationBlocked: true,
      description: 'Consolida pré-condições de baseline cutover. Não aprova cutover real.'
    };
  }
}

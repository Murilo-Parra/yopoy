export class FiscalProductionOperationsPreconditionMatrix {
  public static getMatrix() {
    return {
      preconditionMatrixGenerated: true,
      go: false,
      noGo: true,
      description: 'Mapear pré-condições de transição operacional. Não aprovar execução real.'
    };
  }
}

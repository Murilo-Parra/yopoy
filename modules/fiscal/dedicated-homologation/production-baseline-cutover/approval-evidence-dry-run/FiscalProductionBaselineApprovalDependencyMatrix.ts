export class FiscalProductionBaselineApprovalDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: ['24', '25', '26', '27', '28', '29', '30.1'],
      description: 'Consolida dependências dos domínios 24, 25, 26, 27, 28, 29 e 30.1. Nenhuma dependência concede cutover real, go-live real, gate unlock real ou Produção V2.'
    };
  }
}

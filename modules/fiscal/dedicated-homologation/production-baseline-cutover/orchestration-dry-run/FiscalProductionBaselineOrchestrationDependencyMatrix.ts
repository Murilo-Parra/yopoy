export class FiscalProductionBaselineOrchestrationDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: ['24', '25', '26', '27', '28', '29', '30.1', '30.2'],
      description: 'Consolida dependências dos domínios 24, 25, 26, 27, 28, 29, 30.1 e 30.2. Nenhuma dependência concede orquestração real, rollout real, cutover real, gate unlock real ou Produção V2.'
    };
  }
}

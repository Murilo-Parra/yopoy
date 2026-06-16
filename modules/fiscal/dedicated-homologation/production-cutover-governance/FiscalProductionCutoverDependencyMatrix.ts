export class FiscalProductionCutoverDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      realCutoverApproved: false,
      cutoverExecuted: false,
      productionV2Activated: false,
      description: 'Consolida dependências dos Módulos 26.x, 25.x e 24.x e outros domínios. Nenhuma dependência concede cutover real.'
    };
  }
}

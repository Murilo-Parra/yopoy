export class FiscalProductionRollbackAbortDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      realRollbackExecuted: false,
      realCutoverApproved: false,
      cutoverExecuted: false,
      productionV2Activated: false,
      description: 'Consolida dependências dos Módulos 27.x, 26.x, 25.x e 24.x. Nenhuma dependência concede rollback real.'
    };
  }
}

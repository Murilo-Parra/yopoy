export class FiscalProductionRolloutApprovalDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      realRolloutExecuted: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      description: 'Consolida dependências documentais dos módulos 27.x, 26.x, 25.x, 24.x. Nenhuma dependência concede rollout real.'
    };
  }
}

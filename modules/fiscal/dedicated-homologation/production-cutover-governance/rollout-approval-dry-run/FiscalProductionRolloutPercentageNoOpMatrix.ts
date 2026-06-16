export class FiscalProductionRolloutPercentageNoOpMatrix {
  public static getMatrix() {
    return {
      rolloutPercentageNoOpMatrixGenerated: true,
      realTrafficPromoted: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Modelagem da matriz percentual de rollout simulado. Não promove tráfego real. Não direcionar rota para V2.'
    };
  }
}

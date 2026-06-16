export class FiscalProductionTrafficMutationBlockMatrix {
  public static getMatrix() {
    return {
      trafficMutationBlockMatrixGenerated: true,
      realTrafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Consolidar bloqueios contra mutação real de tráfego.'
    };
  }
}

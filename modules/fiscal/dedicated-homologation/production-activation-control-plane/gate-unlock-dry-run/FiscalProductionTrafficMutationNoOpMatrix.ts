export class FiscalProductionTrafficMutationNoOpMatrix {
  public static getMatrix() {
    return {
      trafficMutationNoOpMatrixGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Impedir alteração de tráfego.'
    };
  }
}

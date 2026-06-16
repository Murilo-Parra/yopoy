export class FiscalProductionRoutingDriftNoDetectRealMatrix {
  public static getMatrix() {
    return {
      routingDriftMatrixGenerated: true,
      realRoutingDriftDetected: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Verificação documental de roteamento (sem scan real).'
    };
  }
}

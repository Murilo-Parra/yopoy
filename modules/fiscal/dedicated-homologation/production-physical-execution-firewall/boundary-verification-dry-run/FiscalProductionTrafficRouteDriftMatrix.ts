export class FiscalProductionTrafficRouteDriftMatrix {
  public static getMatrix() {
    return {
      trafficRouteDriftMatrixGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      realTrafficPromoted: false,
      description: 'Simular drift de tráfego e rotas. Não alterar routeToV2. Não alterar routeToLegacy. Não alterar tráfego.'
    };
  }
}

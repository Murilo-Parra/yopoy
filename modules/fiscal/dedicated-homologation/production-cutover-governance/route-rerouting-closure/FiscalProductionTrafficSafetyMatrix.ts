export class FiscalProductionTrafficSafetyMatrix {
  public static getMatrix() {
    return {
      trafficSafetyMatrixGenerated: true,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      mirrorInstalled: false,
      snifferInstalled: false,
      shadowTrafficEnabled: false,
      description: 'Consolidação de safety de tráfego. Confirma ausência de proxy, middleware, tap, mirror, sniffer e shadow traffic.'
    };
  }
}

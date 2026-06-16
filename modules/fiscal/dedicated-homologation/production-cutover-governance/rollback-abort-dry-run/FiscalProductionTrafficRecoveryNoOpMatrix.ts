export class FiscalProductionTrafficRecoveryNoOpMatrix {
  public static getMatrix() {
    return {
      trafficRecoveryNoOpMatrixGenerated: true,
      trafficChanged: false,
      trafficRecoveredByRealAction: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      description: 'Modelagem da matriz de recuperação de tráfego como no-op. Não altera tráfego real. Não instala proxy/middleware/tap.'
    };
  }
}

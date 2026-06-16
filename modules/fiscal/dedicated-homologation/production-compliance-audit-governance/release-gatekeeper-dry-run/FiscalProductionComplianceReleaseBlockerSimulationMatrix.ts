export class FiscalProductionComplianceReleaseBlockerSimulationMatrix {
  public static getMatrix() {
    return {
      releaseBlockerSimulationMatrixGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      description: 'Consolidar blockers simulados de release. Não bloquear tráfego real. Não alterar rotas reais.'
    };
  }
}

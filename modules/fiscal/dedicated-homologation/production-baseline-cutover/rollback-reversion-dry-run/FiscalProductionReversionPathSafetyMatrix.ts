export class FiscalProductionReversionPathSafetyMatrix {
  public static getMatrix() {
    return {
      reversionPathSafetyMatrixGenerated: true,
      realTrafficReverted: false,
      routeToV2: false,
      description: 'Modelagem segurança do caminho de reversão. Não executa reversion real. Não ativa routeToV2.'
    };
  }
}

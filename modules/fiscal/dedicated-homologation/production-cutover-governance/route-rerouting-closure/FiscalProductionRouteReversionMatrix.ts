export class FiscalProductionRouteReversionMatrix {
  public static getMatrix() {
    return {
      routeReversionMatrixGenerated: true,
      realRollbackExecuted: false,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Modelagem da matriz de reversão. Não executa rollback real. Não altera rota real.'
    };
  }
}

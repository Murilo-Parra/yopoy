export class FiscalProductionFinalNoRoutingStateMatrix {
  public static getMatrix() {
    return {
      finalNoRoutingStateMatrixGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      realTrafficChanged: false,
      description: 'Registrar ausência final de roteamento V2 e preservação legada.'
    };
  }
}

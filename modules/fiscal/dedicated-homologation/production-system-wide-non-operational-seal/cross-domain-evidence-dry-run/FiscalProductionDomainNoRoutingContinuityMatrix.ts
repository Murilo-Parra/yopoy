export class FiscalProductionDomainNoRoutingContinuityMatrix {
  public static getMatrix() {
    return {
      domainNoRoutingContinuityMatrixGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      realTrafficChanged: false,
      description: 'Consolidar ausência de roteamento real.'
    };
  }
}

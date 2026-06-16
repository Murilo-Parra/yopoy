export class FiscalSyntheticRouteCompatibilityMatrix {
  public static generateMatrix() {
    return {
      compatibilityMatrixGenerated: true,
      approvedForRealRouteTransition: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Administrative mapping of Legacy vs V2 compatibility. Grants zero operational authorization for real route transition.'
    };
  }
}

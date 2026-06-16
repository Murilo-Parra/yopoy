export class FiscalDay2ChangeControlReadinessMatrix {
  public static getMatrix() {
    return {
      changeControlReadinessMatrixGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Modelagem de matriz de change control day-2. Não aprova mudança real. Não altera tráfego.'
    };
  }
}

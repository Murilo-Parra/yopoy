export class FiscalProductionCutoverClosureInventory {
  public static getInventory() {
    return {
      closureInventoryGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Consolida Módulos 27.1 a 27.4 e Domínio 26 encerrado. Nenhum submódulo concede cutover real.'
    };
  }
}

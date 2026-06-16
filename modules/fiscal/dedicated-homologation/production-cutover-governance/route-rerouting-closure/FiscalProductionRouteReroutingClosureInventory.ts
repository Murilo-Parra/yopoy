export class FiscalProductionRouteReroutingClosureInventory {
  public static getInventory() {
    return {
      closureInventoryGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Consolida inventário de fechamento de re-routing. Nenhuma rota real foi alterada.'
    };
  }
}

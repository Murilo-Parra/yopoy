export class FiscalProductionBaselineCutoverScopeInventory {
  public static getInventory() {
    return {
      scopeInventoryGenerated: true,
      trafficChanged: false,
      description: 'Inventário de escopo de cutover baseline. Não altera escopo real.'
    };
  }
}

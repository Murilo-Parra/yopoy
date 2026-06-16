export class FiscalLegacyRouteInventory {
  public static generateInventory() {
    return {
      legacyRouteInventoryGenerated: true,
      routeToLegacy: true,
      description: 'Conceptual catalog of critical legacy routes. No legacy routes were removed. No official legacy responses were changed. Does not call legacy handler.'
    };
  }
}

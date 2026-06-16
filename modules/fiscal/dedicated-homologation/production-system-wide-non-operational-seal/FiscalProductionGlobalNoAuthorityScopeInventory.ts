export class FiscalProductionGlobalNoAuthorityScopeInventory {
  public static getInventory() {
    return {
      globalNoAuthorityScopeInventoryGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      description: 'Inventariar ausência global de autoridade real.'
    };
  }
}

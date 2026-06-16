export class FiscalProductionRetentionScopeInventory {
  public static getInventory() {
    return {
      retentionScopeInventoryGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Inventariar escopo de retenção como metadado.'
    };
  }
}

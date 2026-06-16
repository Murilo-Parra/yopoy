export class FiscalProductionFinalGoLiveScopeInventory {
  public static getInventory() {
    return {
      scopeInventoryGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      domainsClosed: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
      description: 'Consolidar escopo dos domínios 28 a 40. Listar domínios fechados e suas flags de inércia.'
    };
  }
}

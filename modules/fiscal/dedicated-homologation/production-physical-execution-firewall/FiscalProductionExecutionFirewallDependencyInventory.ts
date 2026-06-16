export class FiscalProductionExecutionFirewallDependencyInventory {
  public static getInventory() {
    return {
      dependencyInventoryGenerated: true,
      realPhysicalExecutionGranted: false,
      realRuntimeGranted: false,
      realDatabaseGranted: false,
      realSefazGranted: false,
      realAuthorizationGranted: false,
      realGateUnlockGranted: false,
      productionV2Activated: false,
      routeToV2: false,
      domains: ['28', '29', '30', '31', '32', '33'],
      description: 'Consolidar dependências dos domínios 28, 29, 30, 31, 32 e 33.'
    };
  }
}

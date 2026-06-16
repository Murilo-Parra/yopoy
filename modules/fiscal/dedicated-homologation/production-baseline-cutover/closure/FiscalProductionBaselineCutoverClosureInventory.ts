export class FiscalProductionBaselineCutoverClosureInventory {
  public static getInventory() {
    return {
      closureInventoryGenerated: true,
      realClosureExecuted: false,
      activationBlocked: true,
      scope: ['30.1', '30.2', '30.3', '30.4'],
      description: 'Inventário consolidado dos subdomínios de Baseline Cutover. Não executa closure real.'
    };
  }
}

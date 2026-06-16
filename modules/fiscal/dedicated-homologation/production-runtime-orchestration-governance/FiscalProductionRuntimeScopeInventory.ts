export class FiscalProductionRuntimeScopeInventory {
  public static getInventory() {
    return {
      runtimeScopeInventoryGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Inventariar escopos futuros de runtime apenas como metadados. Não consultar runtime real. Não ler logs reais, traces reais, métricas reais ou payload de fila.'
    };
  }
}

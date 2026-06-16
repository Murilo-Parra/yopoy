export class FiscalProductionMitigationActionNoOpCatalog {
  public static getCatalog() {
    return {
      mitigationActionNoOpCatalogGenerated: true,
      realMitigationExecuted: false,
      realRemediationExecuted: false,
      description: 'Modelar catálogo de mitigação no-op. Não executar mitigação real. Não executar remediação real.'
    };
  }
}

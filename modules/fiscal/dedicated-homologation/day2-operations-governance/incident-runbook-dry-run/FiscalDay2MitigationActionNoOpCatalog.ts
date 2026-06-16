export class FiscalDay2MitigationActionNoOpCatalog {
  public static getCatalog() {
    return {
      mitigationActionNoOpCatalogGenerated: true,
      realMitigationExecuted: false,
      trafficChanged: false,
      routeToV2: false,
      realDatabaseConnected: false,
      realSefazCalled: false,
      description: 'Modelagem de catálogo de ações mitigatórias no-op. Não executa ação mitigatória real. Não altera tráfego, rota, banco, SEFAZ ou runtime.'
    };
  }
}

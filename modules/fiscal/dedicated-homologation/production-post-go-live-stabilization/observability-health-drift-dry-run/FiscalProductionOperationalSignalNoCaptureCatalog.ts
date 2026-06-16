export class FiscalProductionOperationalSignalNoCaptureCatalog {
  public static getCatalog() {
    return {
      operationalSignalNoCaptureCatalogGenerated: true,
      realMetricsCaptured: false,
      realLogsCaptured: false,
      realTracesCaptured: false,
      description: 'Catalogar sinais operacionais simulados. Não capturar métricas, logs ou traces reais.'
    };
  }
}

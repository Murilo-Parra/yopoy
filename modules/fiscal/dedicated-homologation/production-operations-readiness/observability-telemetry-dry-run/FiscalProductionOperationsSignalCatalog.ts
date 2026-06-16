export class FiscalProductionOperationsSignalCatalog {
  public static getCatalog() {
    return {
      signalCatalogGenerated: true,
      realMetricsCaptured: false,
      realTelemetryRead: false,
      description: 'Catalogar sinais operacionais simulados. Não ler métrica real. Não ler telemetria real.'
    };
  }
}

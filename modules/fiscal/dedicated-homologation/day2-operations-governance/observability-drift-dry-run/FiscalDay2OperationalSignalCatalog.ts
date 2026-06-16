export class FiscalDay2OperationalSignalCatalog {
  public static getCatalog() {
    return {
      operationalSignalCatalogGenerated: true,
      realMetricsCaptured: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      description: 'Modelagem de catálogo de sinais operacionais day-2. Não lê métrica real. Não captura request/response/payload.'
    };
  }
}

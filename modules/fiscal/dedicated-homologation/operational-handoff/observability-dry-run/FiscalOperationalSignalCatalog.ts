export class FiscalOperationalSignalCatalog {
  public static generateCatalog() {
    return {
      signalCatalogGenerated: true,
      realRequestCaptured: false,
      payloadRead: false,
      description: 'Model of future operational health signals. Documental/simulated signals only. No real traffic captured. No raw payload read.'
    };
  }
}

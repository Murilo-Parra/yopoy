export class FiscalSyntheticLegacyResponseShapeCatalog {
  public static generateCatalog() {
    return {
      legacyResponseShapesGenerated: true,
      legacyHandlerCalled: false,
      payloadIncluded: false,
      safeShapeOnly: true,
      description: 'Documentary safe-shapes of legacy responses. No real legacy handler is called and no raw payloads are included.'
    };
  }
}

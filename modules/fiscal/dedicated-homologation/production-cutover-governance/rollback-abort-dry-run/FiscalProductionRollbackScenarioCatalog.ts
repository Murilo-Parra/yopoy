export class FiscalProductionRollbackScenarioCatalog {
  public static getCatalog() {
    return {
      rollbackScenarioCatalogGenerated: true,
      requestCaptured: false,
      responseCaptured: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      description: 'Catalogação de cenários sintéticos de rollback. Não usa request/response real. Não aciona handler real.'
    };
  }
}

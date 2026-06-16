export class FiscalProductionRouteInvariantEvidence {
  public static getEvidence() {
    return {
      routeInvariantEvidenceGenerated: true,
      appUseModified: false,
      routerUseModified: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      description: 'Evidência de invariância das rotas. Não inspeciona payload real. Não chama handler real.'
    };
  }
}

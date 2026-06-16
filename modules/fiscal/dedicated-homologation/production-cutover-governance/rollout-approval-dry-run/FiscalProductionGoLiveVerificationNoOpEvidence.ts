export class FiscalProductionGoLiveVerificationNoOpEvidence {
  public static getEvidence() {
    return {
      goLiveVerificationNoOpEvidenceGenerated: true,
      realGoLiveExecuted: false,
      realEndpointCalled: false,
      v2HandlerCalled: false,
      description: 'Evidência de que nenhum go-live real foi verificado como ativo. Não chama endpoint real. Não chama handler real.'
    };
  }
}

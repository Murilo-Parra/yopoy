export class FiscalProductionEndpointReadinessNoCallEvidence {
  public static getEvidence() {
    return {
      endpointReadinessNoCallEvidenceGenerated: true,
      realEndpointCalled: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      description: 'Evidência de prontidão de endpoint sem chamada real. Não chama endpoint legado ou V2.'
    };
  }
}

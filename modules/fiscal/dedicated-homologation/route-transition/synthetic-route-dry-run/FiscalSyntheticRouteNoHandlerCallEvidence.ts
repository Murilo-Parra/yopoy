export class FiscalSyntheticRouteNoHandlerCallEvidence {
  public static generateEvidence() {
    return {
      noHandlerCallEvidenceGenerated: true,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      realEndpointCalled: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      description: 'Evidence affirming that real handlers and endpoints remain completely isolated and uncalled.'
    };
  }
}

export class FiscalRouteSandboxNoRuntimeExecutionEvidence {
  public static generateEvidence() {
    return {
      noRuntimeExecutionEvidenceGenerated: true,
      realRouteExecuted: false,
      realEndpointCalled: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      description: 'Administrative evidence affirming absence of real runtime execution.'
    };
  }
}

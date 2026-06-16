export class FiscalRouteShadowNoCaptureEvidence {
  public static generateEvidence() {
    return {
      shadowNoCaptureEvidenceGenerated: true,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Administrative evidence of no structural capture occurring. No raw payloads are returned.'
    };
  }
}

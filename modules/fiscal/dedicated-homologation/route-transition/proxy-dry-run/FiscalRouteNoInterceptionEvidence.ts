export class FiscalRouteNoInterceptionEvidence {
  public static generateEvidence() {
    return {
      noInterceptionEvidenceGenerated: true,
      appUseModified: false,
      middlewareInstalled: false,
      proxyInstalled: false,
      tapInstalled: false,
      requestCaptured: false,
      responseCaptured: false,
      description: 'Administrative evidence of no real interception. No capture of request or response.'
    };
  }
}

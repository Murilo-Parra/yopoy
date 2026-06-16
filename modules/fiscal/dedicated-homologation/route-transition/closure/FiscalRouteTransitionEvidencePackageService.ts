export class FiscalRouteTransitionEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealRouteTransition: false,
      description: 'Final evidence package of administrative simulations. Excludes real payloads, XML, PDF, base64, and secrets.'
    };
  }
}

export class FiscalProductionExecutionAuthorizationEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Final evidence package. Excludes raw payload, raw XML, PDF/base64, and secrets.'
    };
  }
}

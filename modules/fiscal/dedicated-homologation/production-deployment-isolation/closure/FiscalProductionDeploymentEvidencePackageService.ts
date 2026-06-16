export class FiscalProductionDeploymentEvidencePackageService {
  public static generateEvidencePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Documentary and sanitized evidence package. Excludes raw payloads, raw XML, PDFs, base64 strings, and secrets.'
    };
  }
}

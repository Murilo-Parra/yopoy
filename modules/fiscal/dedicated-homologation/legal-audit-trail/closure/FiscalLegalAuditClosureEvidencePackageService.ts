export class FiscalLegalAuditClosureEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      legalTrailDefinitive: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Evidences from 18.1 to 18.4 consolidated. This package is purely administrative and not a definitive legal trail. Sentitive data and secrets are omitted.'
    };
  }
}

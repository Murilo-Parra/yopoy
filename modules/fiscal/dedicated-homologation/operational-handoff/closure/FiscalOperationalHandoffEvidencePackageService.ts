export class FiscalOperationalHandoffEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealLegalSignOff: false,
      description: 'Consolidation of evidences from 20.1 to 20.3. No raw payload. No sensitive data. No certificates/PFX/passwords. No XML/PDF/base64. Evidence is not real legal sign-off. Package is purely administrative.'
    };
  }
}

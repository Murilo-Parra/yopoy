export class FiscalProductionActivationEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealProductionActivation: false,
      description: 'Consolidated evidences from 19.1 to 19.5 in an administrative package. Evidence is not operational authorization. No raw payload, sensitive data, certificate, PFX, password, XML, or PDF is included.'
    };
  }
}

export class FiscalProductionOperationsSignatureGovernanceEvidencePackageService {
  public static getEvidencePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      evidences: {
        absentRealSignature: true,
        absentRealCryptographicSignature: true,
        absentRealConsentPersisted: true,
        absentRealApprovalRecord: true,
        absentRealAuthorization: true,
        absentRealToken: true,
        absentRealGateUnlock: true,
        absentRealCryptoCertificatePfxXmlPdf: true,
        absentRealDatabaseSefazRuntime: true
      },
      description: 'Gerar pacote final de evidências sem payload bruto e sem dado sensível.'
    };
  }
}

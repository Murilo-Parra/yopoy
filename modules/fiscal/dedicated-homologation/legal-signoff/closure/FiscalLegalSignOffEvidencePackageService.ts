export class FiscalLegalSignOffEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      xmlSigned: false,
      pdfGenerated: false,
      approvedForRealLegalSignOff: false,
      description: 'Administrative evidence package of 21.1, 21.2, 21.3. No raw payload. No secrets. No cert/PFX/password. No XML/PDF. No real crypto signature.'
    };
  }
}

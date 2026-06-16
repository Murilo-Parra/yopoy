export class FiscalProductionExternalIntegrationLockedPlan {
  public static getPlan() {
    return {
      externalIntegrationLockedPlanGenerated: true,
      realSefazCalled: false,
      realCertificateLoaded: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Declara SEFAZ, certificado, XML, PDF e crypto bloqueados.'
    };
  }
}

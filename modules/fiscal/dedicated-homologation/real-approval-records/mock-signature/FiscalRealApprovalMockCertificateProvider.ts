export class FiscalRealApprovalMockCertificateProvider {
  public static getMockCertificate() {
    return {
      mockCertificateGenerated: true,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      sensitiveDataIncluded: false,
      certificate: {
        subject: 'CN=Mock Certificate, O=Simulated Org, C=BR',
        issuer: 'CN=Mock CA, O=Simulated Org, C=BR',
        validFrom: '2020-01-01T00:00:00Z',
        validTo: '2030-01-01T00:00:00Z',
        fingerprint: 'MOCK_FINGERPRINT_NOT_REAL_CERT',
        isMock: true
      }
    };
  }
}

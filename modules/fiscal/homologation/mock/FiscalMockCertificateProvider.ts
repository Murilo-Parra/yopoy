export class FiscalMockCertificateProvider {
  public static simulateCertificateLoad() {
    return {
      simulatedLoadAt: new Date().toISOString(),
      certificateLoaded: false as false,
      realPfxRead: false as false,
      certificatePasswordRead: false as false,
      status: 'MOCKED_CERTIFICATE',
      subject: 'CN=MOCK_COMPANY, O=MOCK, C=BR',
      issuer: 'CN=MOCK_CA, O=MOCK, C=BR',
      validity: 'Valid Mock',
      message: 'This is a simulated certificate. No real file/password was read.'
    };
  }
}

export class FiscalRealApprovalMockAuthorizationProvider {
  public static getMockAuthorization() {
    return {
      providerSimulated: true,
      externalEndpointCalled: false,
      externalApproverNotified: false,
      realAuthorizationGranted: false,
      payloadIncluded: false,
      authorizationState: {
        status: 'MOCK_AUTHORIZED',
        transactionId: 'mock_ext_txn_123',
        description: 'Simulated authorization from external provider'
      }
    };
  }
}

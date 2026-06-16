import { FiscalRealApprovalMockAuthorizationProvider } from './FiscalRealApprovalMockAuthorizationProvider';

export class FiscalRealApprovalExternalAuthorizationSimulator {
  public static simulateAuthorization() {
    const authProviderSim = FiscalRealApprovalMockAuthorizationProvider.getMockAuthorization();
    return {
      externalAuthorizationSimulated: true,
      realAuthorizationGranted: false,
      externalEndpointCalled: false,
      externalApproverNotified: false,
      simulationResult: authProviderSim.authorizationState,
      notes: 'This simulation requires explicit module for real external authorization.'
    };
  }
}

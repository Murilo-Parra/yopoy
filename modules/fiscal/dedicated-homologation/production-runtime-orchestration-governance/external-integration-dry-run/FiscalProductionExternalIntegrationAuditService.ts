import { FiscalProductionExternalIntegrationResult } from './FiscalProductionExternalIntegrationTypes';

export class FiscalProductionExternalIntegrationAuditService {
  public static generateAuditRecord(result: FiscalProductionExternalIntegrationResult) {
    return {
      auditId: `AUD-EXT-INT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SIMULATE_EXTERNAL_INTEGRATION_NO_OP',
      outcome: result.success ? 'SUCCESS' : 'FAILED',
      realExternalApiCalled: false,
      realSefazCalled: false,
      realHttpAdapterBound: false,
      realCallbackRegistered: false,
      realWebhookSent: false,
      realAuthorizationTokenIssued: false,
      realAuthorizationGranted: false,
      note: 'Audit record is purely administrative and not persisted.'
    };
  }
}

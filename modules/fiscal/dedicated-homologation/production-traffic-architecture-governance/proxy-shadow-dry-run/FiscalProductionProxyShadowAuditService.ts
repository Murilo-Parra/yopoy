import { FiscalProductionProxyShadowResult } from './FiscalProductionProxyShadowTypes';

export class FiscalProductionProxyShadowAuditService {
  public static generateAuditRecord(result: FiscalProductionProxyShadowResult) {
    return {
      auditId: `AUD-PROXY-SHADOW-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SIMULATE_PROXY_SHADOW_NO_OP',
      outcome: result.success ? 'SUCCESS' : 'FAILED',
      realProxyInstalled: false,
      realMiddlewareInstalled: false,
      realShadowTrafficEnabled: false,
      realRequestCaptured: false,
      realPayloadCaptured: false,
      note: 'Audit record is purely administrative and not persisted.'
    };
  }
}

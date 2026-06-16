import { FiscalProductionTrafficRoutingResult } from './FiscalProductionTrafficRoutingTypes';

export class FiscalProductionTrafficRoutingAuditService {
  public static generateAuditRecord(result: FiscalProductionTrafficRoutingResult) {
    return {
      auditId: `AUD-TRAFFIC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SIMULATE_TRAFFIC_ROUTING_NO_OP',
      outcome: result.success ? 'SUCCESS' : 'FAILED',
      trafficChanged: false,
      routeToV2: false,
      note: 'Audit record is purely administrative and not persisted.'
    };
  }
}

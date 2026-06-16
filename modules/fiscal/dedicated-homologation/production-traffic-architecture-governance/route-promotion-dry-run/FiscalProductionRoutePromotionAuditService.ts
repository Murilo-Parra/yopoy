import { FiscalProductionRoutePromotionResult } from './FiscalProductionRoutePromotionTypes';

export class FiscalProductionRoutePromotionAuditService {
  public static generateAuditRecord(result: FiscalProductionRoutePromotionResult) {
    return {
      auditId: `AUD-ROUTE-PROM-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SIMULATE_ROUTE_PROMOTION_NO_OP',
      outcome: result.success ? 'SUCCESS' : 'FAILED',
      realRoutePromoted: false,
      realTrafficPercentageChanged: false,
      realCanaryRoutingActivated: false,
      routeToV2: false,
      note: 'Audit record is purely administrative and not persisted.'
    };
  }
}

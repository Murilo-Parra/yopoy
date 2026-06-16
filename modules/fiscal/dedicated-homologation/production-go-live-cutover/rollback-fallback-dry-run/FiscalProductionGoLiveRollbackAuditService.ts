import { FiscalProductionGoLiveRollbackResult } from './FiscalProductionGoLiveRollbackTypes';

export class FiscalProductionGoLiveRollbackAuditService {
  public static generateAuditRecord(result: FiscalProductionGoLiveRollbackResult) {
    return {
      auditId: `AUD-ROLLBACK-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SIMULATE_GO_LIVE_ROLLBACK_NO_OP',
      outcome: result.success ? 'SUCCESS' : 'FAILED',
      realRollbackExecuted: false,
      realFallbackExecuted: false,
      note: 'Audit record is purely administrative and not persisted.'
    };
  }
}

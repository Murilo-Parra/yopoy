import { FiscalProductionQueueWorkerResult } from './FiscalProductionQueueWorkerTypes';

export class FiscalProductionQueueWorkerAuditService {
  public static generateAuditRecord(result: FiscalProductionQueueWorkerResult) {
    return {
      auditId: `AUD-QWORKER-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'SIMULATE_QUEUE_WORKER_NO_OP',
      outcome: result.success ? 'SUCCESS' : 'FAILED',
      realQueueStarted: false,
      realJobEnqueued: false,
      realWorkerDispatched: false,
      payloadIncluded: false,
      note: 'Audit record is purely administrative and not persisted.'
    };
  }
}

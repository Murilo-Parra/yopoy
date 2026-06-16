import { FiscalRealApprovalRecordDryRunInput } from './FiscalRealApprovalRecordDryRunTypes';

export class FiscalRealApprovalRecordDryRunRepository {
  private static mockStore: any[] = [];

  public static simulateStore(input: FiscalRealApprovalRecordDryRunInput) {
    const recordId = 'DRYRUN-' + Date.now();
    
    const mockRecord = {
      id: recordId,
      companyId: input.companyId || 'SIMULATED',
      requestId: input.requestId || 'SIMULATED',
      storedAt: new Date().toISOString(),
      status: 'DRY_RUN_PERSISTENCE_ONLY'
    };

    this.mockStore.push(mockRecord);
    if (this.mockStore.length > 500) {
      this.mockStore.shift();
    }

    return {
      approvalRecordDryRunStored: true,
      approvalRecordPersisted: false,
      dmlExecuted: false,
      insertExecuted: false,
      updateExecuted: false,
      deleteExecuted: false,
      commitExecuted: false,
      realDatabaseConnected: false,
      simulatedRecord: mockRecord
    };
  }

  public static list() {
    return this.mockStore;
  }
}

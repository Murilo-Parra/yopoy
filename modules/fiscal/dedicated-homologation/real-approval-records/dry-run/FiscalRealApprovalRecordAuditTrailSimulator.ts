import { FiscalRealApprovalRecordDryRunInput } from './FiscalRealApprovalRecordDryRunTypes';

export class FiscalRealApprovalRecordAuditTrailSimulator {
  private static trails: any[] = [];

  public static simulate(input: FiscalRealApprovalRecordDryRunInput) {
    const log = {
      timestamp: new Date().toISOString(),
      action: 'DRY_RUN_PERSISTENCE_EVALUATED',
      companyId: input.companyId || 'SIMULATED',
      actor: input.requestedBy || 'SYSTEM',
      event: 'Audit trail simulation generated administrative event'
    };

    this.trails.push(log);
    if (this.trails.length > 1000) this.trails.shift();

    return {
      auditTrailSimulated: true,
      realAuditPersisted: false,
      approversExternallyNotified: false,
      sensitiveDataLogged: false,
      trail: log
    };
  }

  public static getTrails() {
    return this.trails;
  }
}

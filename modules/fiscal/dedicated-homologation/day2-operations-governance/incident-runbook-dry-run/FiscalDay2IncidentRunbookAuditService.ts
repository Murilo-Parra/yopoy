import { FiscalDay2IncidentRunbookInput, FiscalDay2IncidentRunbookResult } from './FiscalDay2IncidentRunbookTypes';

export class FiscalDay2IncidentRunbookAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalDay2IncidentRunbookInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_INCIDENT_RUNBOOK_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalDay2IncidentRunbookInput, result: FiscalDay2IncidentRunbookResult) {
    this.auditLogs.push({
      action: 'EVALUATE_INCIDENT_RUNBOOK_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalDay2IncidentRunbookInput, result: FiscalDay2IncidentRunbookResult) {
    this.auditLogs.push({
      action: 'SIMULATE_INCIDENT_RUNBOOK_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

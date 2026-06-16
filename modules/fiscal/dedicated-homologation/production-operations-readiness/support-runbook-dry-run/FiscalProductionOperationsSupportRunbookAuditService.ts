import { FiscalProductionOperationsSupportRunbookInput, FiscalProductionOperationsSupportRunbookResult } from './FiscalProductionOperationsSupportRunbookTypes';

export class FiscalProductionOperationsSupportRunbookAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionOperationsSupportRunbookInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_SUPPORT_RUNBOOK_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionOperationsSupportRunbookInput, result: FiscalProductionOperationsSupportRunbookResult) {
    this.auditLogs.push({
      action: 'EVALUATE_SUPPORT_RUNBOOK_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionOperationsSupportRunbookInput, result: FiscalProductionOperationsSupportRunbookResult) {
    this.auditLogs.push({
      action: 'SIMULATE_SUPPORT_RUNBOOK_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

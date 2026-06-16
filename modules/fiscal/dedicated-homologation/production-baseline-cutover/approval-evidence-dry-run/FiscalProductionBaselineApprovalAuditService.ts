import { FiscalProductionBaselineApprovalInput, FiscalProductionBaselineApprovalResult } from './FiscalProductionBaselineApprovalTypes';

export class FiscalProductionBaselineApprovalAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionBaselineApprovalInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_BASELINE_APPROVAL',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionBaselineApprovalInput, result: FiscalProductionBaselineApprovalResult) {
    this.auditLogs.push({
      action: 'EVALUATE_BASELINE_APPROVAL',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionBaselineApprovalInput, result: FiscalProductionBaselineApprovalResult) {
    this.auditLogs.push({
      action: 'SIMULATE_BASELINE_APPROVAL_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

import { FiscalProductionRolloutApprovalInput, FiscalProductionRolloutApprovalResult } from './FiscalProductionRolloutApprovalTypes';

export class FiscalProductionRolloutApprovalAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionRolloutApprovalInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_FINAL_ROLLOUT_APPROVAL_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionRolloutApprovalInput, result: FiscalProductionRolloutApprovalResult) {
    this.auditLogs.push({
      action: 'EVALUATE_FINAL_ROLLOUT_APPROVAL_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionRolloutApprovalInput, result: FiscalProductionRolloutApprovalResult) {
    this.auditLogs.push({
      action: 'SIMULATE_FINAL_ROLLOUT_APPROVAL_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

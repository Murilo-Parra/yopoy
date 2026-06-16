import { FiscalProductionRollbackAbortInput, FiscalProductionRollbackAbortResult } from './FiscalProductionRollbackAbortTypes';

export class FiscalProductionRollbackAbortAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionRollbackAbortInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_FINAL_ROLLBACK_ABORT_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionRollbackAbortInput, result: FiscalProductionRollbackAbortResult) {
    this.auditLogs.push({
      action: 'EVALUATE_FINAL_ROLLBACK_ABORT_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionRollbackAbortInput, result: FiscalProductionRollbackAbortResult) {
    this.auditLogs.push({
      action: 'SIMULATE_FINAL_ROLLBACK_ABORT_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

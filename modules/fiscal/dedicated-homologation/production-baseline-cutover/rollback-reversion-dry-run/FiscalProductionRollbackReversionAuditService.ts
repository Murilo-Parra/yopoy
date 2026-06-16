import { FiscalProductionBaselineRollbackInput, FiscalProductionBaselineRollbackResult } from './FiscalProductionBaselineRollbackTypes';

export class FiscalProductionRollbackReversionAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionBaselineRollbackInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_ROLLBACK_REVERSION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionBaselineRollbackInput, result: FiscalProductionBaselineRollbackResult) {
    this.auditLogs.push({
      action: 'EVALUATE_ROLLBACK_REVERSION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionBaselineRollbackInput, result: FiscalProductionBaselineRollbackResult) {
    this.auditLogs.push({
      action: 'SIMULATE_ROLLBACK_REVERSION_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

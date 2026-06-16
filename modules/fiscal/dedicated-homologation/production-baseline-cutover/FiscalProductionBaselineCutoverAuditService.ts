import { FiscalProductionBaselineCutoverInput, FiscalProductionBaselineCutoverResult } from './FiscalProductionBaselineCutoverTypes';

export class FiscalProductionBaselineCutoverAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionBaselineCutoverInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_BASELINE_CUTOVER',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionBaselineCutoverInput, result: FiscalProductionBaselineCutoverResult) {
    this.auditLogs.push({
      action: 'EVALUATE_BASELINE_CUTOVER',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionBaselineCutoverInput, result: FiscalProductionBaselineCutoverResult) {
    this.auditLogs.push({
      action: 'SIMULATE_BASELINE_CUTOVER_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

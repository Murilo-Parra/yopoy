import { FiscalProductionBaselineCutoverClosureInput, FiscalProductionBaselineCutoverClosureResult } from './FiscalProductionBaselineCutoverClosureTypes';

export class FiscalProductionBaselineCutoverClosureAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionBaselineCutoverClosureInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_BASELINE_CUTOVER_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionBaselineCutoverClosureInput, result: FiscalProductionBaselineCutoverClosureResult) {
    this.auditLogs.push({
      action: 'EVALUATE_BASELINE_CUTOVER_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionBaselineCutoverClosureInput, result: FiscalProductionBaselineCutoverClosureResult) {
    this.auditLogs.push({
      action: 'SIMULATE_BASELINE_CUTOVER_CLOSURE_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

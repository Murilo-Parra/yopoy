import { FiscalProductionCutoverClosureInput, FiscalProductionCutoverClosureResult } from './FiscalProductionCutoverClosureTypes';

export class FiscalProductionCutoverClosureAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionCutoverClosureInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_FINAL_CUTOVER_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionCutoverClosureInput, result: FiscalProductionCutoverClosureResult) {
    this.auditLogs.push({
      action: 'EVALUATE_FINAL_CUTOVER_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionCutoverClosureInput, result: FiscalProductionCutoverClosureResult) {
    this.auditLogs.push({
      action: 'SIMULATE_FINAL_CUTOVER_CLOSURE_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

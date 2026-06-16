import { FiscalDay2OperationsClosureInput, FiscalDay2OperationsClosureResult } from './FiscalDay2OperationsClosureTypes';

export class FiscalDay2OperationsClosureAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalDay2OperationsClosureInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_DAY2_OPERATIONS_CLOSURE_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalDay2OperationsClosureInput, result: FiscalDay2OperationsClosureResult) {
    this.auditLogs.push({
      action: 'EVALUATE_DAY2_OPERATIONS_CLOSURE_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalDay2OperationsClosureInput, result: FiscalDay2OperationsClosureResult) {
    this.auditLogs.push({
      action: 'SIMULATE_DAY2_OPERATIONS_CLOSURE_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

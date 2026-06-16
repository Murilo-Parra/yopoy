import { FiscalDay2OperationsInput, FiscalDay2OperationsResult } from './FiscalDay2OperationsTypes';

export class FiscalDay2OperationsAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalDay2OperationsInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_DAY2_OPERATIONS_GOVERNANCE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalDay2OperationsInput, result: FiscalDay2OperationsResult) {
    this.auditLogs.push({
      action: 'EVALUATE_DAY2_OPERATIONS_GOVERNANCE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalDay2OperationsInput, result: FiscalDay2OperationsResult) {
    this.auditLogs.push({
      action: 'SIMULATE_DAY2_OPERATIONS_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

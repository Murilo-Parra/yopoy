import { FiscalProductionOperationsReadinessInput, FiscalProductionOperationsReadinessResult } from './FiscalProductionOperationsReadinessTypes';

export class FiscalProductionOperationsReadinessAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionOperationsReadinessInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_OPERATIONS_READINESS',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionOperationsReadinessInput, result: FiscalProductionOperationsReadinessResult) {
    this.auditLogs.push({
      action: 'EVALUATE_OPERATIONS_READINESS',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionOperationsReadinessInput, result: FiscalProductionOperationsReadinessResult) {
    this.auditLogs.push({
      action: 'SIMULATE_OPERATIONS_READINESS_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

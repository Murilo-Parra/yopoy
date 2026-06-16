import { FiscalProductionOperationsTransitionInput, FiscalProductionOperationsTransitionResult } from './FiscalProductionOperationsTransitionTypes';

export class FiscalProductionOperationsTransitionAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionOperationsTransitionInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_PRODUCTION_OPERATIONS_TRANSITION_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionOperationsTransitionInput, result: FiscalProductionOperationsTransitionResult) {
    this.auditLogs.push({
      action: 'EVALUATE_PRODUCTION_OPERATIONS_TRANSITION_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionOperationsTransitionInput, result: FiscalProductionOperationsTransitionResult) {
    this.auditLogs.push({
      action: 'SIMULATE_PRODUCTION_OPERATIONS_TRANSITION_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

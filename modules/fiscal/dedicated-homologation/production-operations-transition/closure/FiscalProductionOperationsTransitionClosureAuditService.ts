import { FiscalProductionOperationsTransitionClosureInput, FiscalProductionOperationsTransitionClosureResult } from './FiscalProductionOperationsTransitionClosureTypes';

export class FiscalProductionOperationsTransitionClosureAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionOperationsTransitionClosureInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_TRANSITION_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionOperationsTransitionClosureInput, result: FiscalProductionOperationsTransitionClosureResult) {
    this.auditLogs.push({
      action: 'EVALUATE_TRANSITION_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionOperationsTransitionClosureInput, result: FiscalProductionOperationsTransitionClosureResult) {
    this.auditLogs.push({
      action: 'SIMULATE_CLOSURE_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

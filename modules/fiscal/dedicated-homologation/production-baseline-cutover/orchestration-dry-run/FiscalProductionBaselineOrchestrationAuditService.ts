import { FiscalProductionBaselineOrchestrationInput, FiscalProductionBaselineOrchestrationResult } from './FiscalProductionBaselineOrchestrationTypes';

export class FiscalProductionBaselineOrchestrationAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionBaselineOrchestrationInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_BASELINE_ORCHESTRATION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionBaselineOrchestrationInput, result: FiscalProductionBaselineOrchestrationResult) {
    this.auditLogs.push({
      action: 'EVALUATE_BASELINE_ORCHESTRATION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionBaselineOrchestrationInput, result: FiscalProductionBaselineOrchestrationResult) {
    this.auditLogs.push({
      action: 'SIMULATE_BASELINE_ORCHESTRATION_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

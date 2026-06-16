import { FiscalProductionOperationsObservabilityInput, FiscalProductionOperationsObservabilityResult } from './FiscalProductionOperationsObservabilityTypes';

export class FiscalProductionOperationsObservabilityAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionOperationsObservabilityInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_OBSERVABILITY_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionOperationsObservabilityInput, result: FiscalProductionOperationsObservabilityResult) {
    this.auditLogs.push({
      action: 'EVALUATE_OBSERVABILITY_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionOperationsObservabilityInput, result: FiscalProductionOperationsObservabilityResult) {
    this.auditLogs.push({
      action: 'SIMULATE_OBSERVABILITY_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

import { FiscalDay2ObservabilityDriftInput, FiscalDay2ObservabilityDriftResult } from './FiscalDay2ObservabilityDriftTypes';

export class FiscalDay2ObservabilityDriftAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalDay2ObservabilityDriftInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_OBSERVABILITY_DRIFT_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalDay2ObservabilityDriftInput, result: FiscalDay2ObservabilityDriftResult) {
    this.auditLogs.push({
      action: 'EVALUATE_OBSERVABILITY_DRIFT_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalDay2ObservabilityDriftInput, result: FiscalDay2ObservabilityDriftResult) {
    this.auditLogs.push({
      action: 'SIMULATE_OBSERVABILITY_DRIFT_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

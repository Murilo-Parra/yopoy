import { FiscalDay2SupportAccessInput, FiscalDay2SupportAccessResult } from './FiscalDay2SupportAccessTypes';

export class FiscalDay2SupportAccessAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalDay2SupportAccessInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_SUPPORT_ACCESS_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalDay2SupportAccessInput, result: FiscalDay2SupportAccessResult) {
    this.auditLogs.push({
      action: 'EVALUATE_SUPPORT_ACCESS_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalDay2SupportAccessInput, result: FiscalDay2SupportAccessResult) {
    this.auditLogs.push({
      action: 'SIMULATE_SUPPORT_ACCESS_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

import { FiscalProductionOperationsAccessHandoffInput, FiscalProductionOperationsAccessHandoffResult } from './FiscalProductionOperationsAccessHandoffTypes';

export class FiscalProductionOperationsAccessHandoffAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionOperationsAccessHandoffInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_ACCESS_HANDOFF_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionOperationsAccessHandoffInput, result: FiscalProductionOperationsAccessHandoffResult) {
    this.auditLogs.push({
      action: 'EVALUATE_ACCESS_HANDOFF_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionOperationsAccessHandoffInput, result: FiscalProductionOperationsAccessHandoffResult) {
    this.auditLogs.push({
      action: 'SIMULATE_ACCESS_HANDOFF_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

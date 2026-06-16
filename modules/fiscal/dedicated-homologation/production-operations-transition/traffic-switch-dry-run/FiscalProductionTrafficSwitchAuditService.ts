import { FiscalProductionTrafficSwitchInput, FiscalProductionTrafficSwitchResult } from './FiscalProductionTrafficSwitchTypes';

export class FiscalProductionTrafficSwitchAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionTrafficSwitchInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_TRAFFIC_SWITCH_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionTrafficSwitchInput, result: FiscalProductionTrafficSwitchResult) {
    this.auditLogs.push({
      action: 'EVALUATE_TRAFFIC_SWITCH_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionTrafficSwitchInput, result: FiscalProductionTrafficSwitchResult) {
    this.auditLogs.push({
      action: 'SIMULATE_TRAFFIC_SWITCH_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

import { FiscalProductionAuthorizationDeliberationInput, FiscalProductionAuthorizationDeliberationResult } from './FiscalProductionAuthorizationDeliberationTypes';

export class FiscalProductionAuthorizationDeliberationAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionAuthorizationDeliberationInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_AUTHORIZATION_DELIBERATION_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionAuthorizationDeliberationInput, result: FiscalProductionAuthorizationDeliberationResult) {
    this.auditLogs.push({
      action: 'EVALUATE_AUTHORIZATION_DELIBERATION_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionAuthorizationDeliberationInput, result: FiscalProductionAuthorizationDeliberationResult) {
    this.auditLogs.push({
      action: 'SIMULATE_AUTHORIZATION_DELIBERATION_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

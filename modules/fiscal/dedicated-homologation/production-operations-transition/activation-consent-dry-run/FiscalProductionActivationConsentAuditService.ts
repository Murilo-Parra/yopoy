import { FiscalProductionActivationConsentInput, FiscalProductionActivationConsentResult } from './FiscalProductionActivationConsentTypes';

export class FiscalProductionActivationConsentAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionActivationConsentInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_ACTIVATION_CONSENT_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionActivationConsentInput, result: FiscalProductionActivationConsentResult) {
    this.auditLogs.push({
      action: 'EVALUATE_ACTIVATION_CONSENT_DRY_RUN',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionActivationConsentInput, result: FiscalProductionActivationConsentResult) {
    this.auditLogs.push({
      action: 'SIMULATE_ACTIVATION_CONSENT_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

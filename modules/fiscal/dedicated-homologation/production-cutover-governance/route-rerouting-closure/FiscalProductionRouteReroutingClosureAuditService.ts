import { FiscalProductionRouteReroutingClosureInput, FiscalProductionRouteReroutingClosureResult } from './FiscalProductionRouteReroutingClosureTypes';

export class FiscalProductionRouteReroutingClosureAuditService {
  private static auditLogs: any[] = [];

  public static logValidation(input: FiscalProductionRouteReroutingClosureInput, result: any) {
    this.auditLogs.push({
      action: 'VALIDATE_FINAL_ROUTE_REROUTING_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.valid ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logEvaluation(input: FiscalProductionRouteReroutingClosureInput, result: FiscalProductionRouteReroutingClosureResult) {
    this.auditLogs.push({
      action: 'EVALUATE_FINAL_ROUTE_REROUTING_CLOSURE',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: result.success ? 'SUCCESS' : 'FAILED_SAFE'
    });
  }

  public static logDecisionSimulation(input: FiscalProductionRouteReroutingClosureInput, result: FiscalProductionRouteReroutingClosureResult) {
    this.auditLogs.push({
      action: 'SIMULATE_FINAL_ROUTE_REROUTING_CLOSURE_DECISION',
      timestamp: new Date().toISOString(),
      metadata: { requestedBy: input.requestedBy },
      result: 'DECISION_SIMULATED_NO_GO'
    });
  }

  public static getAuditLogs() {
    return this.auditLogs;
  }
}

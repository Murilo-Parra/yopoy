import { FiscalRollbackEvaluationInput, FiscalRollbackPlanningStatus } from './FiscalRollbackPlanningTypes';

export class FiscalRollbackPlanningPolicy {
  public static evaluateRequest(input: FiscalRollbackEvaluationInput): {
    rollbackExecuted: false;
    circuitBreakerInstalled: false;
    killSwitchActivated: false;
    sefazHomologationActivated: false;
    activationBlocked: true;
    status: string;
    blockers: string[];
  } {
    const blockers: string[] = [];

    if (input.forceExecute === true) {
      blockers.push('forceExecute is explicitly blocked in Phase 9.2.');
    }

    if (input.requestedAction && (input.requestedAction.toLowerCase().includes('prod') || input.requestedAction.toLowerCase().includes('real'))) {
      blockers.push('Productive requested actions are prohibited.');
    }

    blockers.push('Rollback/Circuit Breaker Planning 9.2 é uma avaliação administrativa. Rollback real, circuit breaker real, kill switch produtivo e homologação SEFAZ real permanecem bloqueados.');

    return {
      rollbackExecuted: false,
      circuitBreakerInstalled: false,
      killSwitchActivated: false,
      sefazHomologationActivated: false,
      activationBlocked: true,
      status: FiscalRollbackPlanningStatus.EXECUTION_BLOCKED,
      blockers
    };
  }
}

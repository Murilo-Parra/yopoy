import { FiscalProductionExecutionAuthorizationClosureInput, FiscalProductionExecutionAuthorizationClosureResult, FiscalProductionExecutionAuthorizationClosureStatus } from './FiscalProductionExecutionAuthorizationClosureTypes';
import { FiscalProductionExecutionAuthorizationClosureEvaluationService } from './FiscalProductionExecutionAuthorizationClosureEvaluationService';

export class FiscalProductionExecutionAuthorizationClosureDecisionService {
  public static simulateDecision(input: FiscalProductionExecutionAuthorizationClosureInput): FiscalProductionExecutionAuthorizationClosureResult {
    const evaluation = FiscalProductionExecutionAuthorizationClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionExecutionAuthorizationClosureStatus.NO_EXECUTION_FINAL_HANDOFF_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

import { FiscalProductionExecutionOrchestrationInput, FiscalProductionExecutionOrchestrationResult, FiscalProductionExecutionOrchestrationStatus } from './FiscalProductionExecutionOrchestrationTypes';
import { FiscalProductionExecutionOrchestrationEvaluationService } from './FiscalProductionExecutionOrchestrationEvaluationService';

export class FiscalProductionExecutionOrchestrationDecisionService {
  public static simulateDecision(input: FiscalProductionExecutionOrchestrationInput): FiscalProductionExecutionOrchestrationResult {
    const evaluation = FiscalProductionExecutionOrchestrationEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionExecutionOrchestrationStatus.COMMAND_BOUNDARY_PLAN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

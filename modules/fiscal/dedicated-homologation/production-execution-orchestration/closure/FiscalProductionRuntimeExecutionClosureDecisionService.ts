import { FiscalProductionRuntimeExecutionClosureInput, FiscalProductionRuntimeExecutionClosureResult, FiscalProductionRuntimeExecutionClosureStatus } from './FiscalProductionRuntimeExecutionClosureTypes';
import { FiscalProductionRuntimeExecutionClosureEvaluationService } from './FiscalProductionRuntimeExecutionClosureEvaluationService';

export class FiscalProductionRuntimeExecutionClosureDecisionService {
  public static simulateDecision(input: FiscalProductionRuntimeExecutionClosureInput): FiscalProductionRuntimeExecutionClosureResult {
    const evaluation = FiscalProductionRuntimeExecutionClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionRuntimeExecutionClosureStatus.RUNTIME_CLOSURE_HANDOFF_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

import { FiscalProductionRuntimeStepDryRunInput, FiscalProductionRuntimeStepDryRunResult, FiscalProductionRuntimeStepDryRunStatus } from './FiscalProductionRuntimeStepDryRunTypes';
import { FiscalProductionRuntimeStepDryRunEvaluationService } from './FiscalProductionRuntimeStepDryRunEvaluationService';

export class FiscalProductionRuntimeStepDryRunDecisionService {
  public static simulateDecision(input: FiscalProductionRuntimeStepDryRunInput): FiscalProductionRuntimeStepDryRunResult {
    const evaluation = FiscalProductionRuntimeStepDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionRuntimeStepDryRunStatus.WORKER_NO_OP_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

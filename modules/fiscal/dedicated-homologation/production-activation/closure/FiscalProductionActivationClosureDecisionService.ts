import { FiscalProductionActivationClosureInput, FiscalProductionActivationClosureResult, FiscalProductionActivationClosureStatus } from './FiscalProductionActivationClosureTypes';
import { FiscalProductionActivationClosureEvaluationService } from './FiscalProductionActivationClosureEvaluationService';

export class FiscalProductionActivationClosureDecisionService {
  public static simulateDecision(input: FiscalProductionActivationClosureInput): FiscalProductionActivationClosureResult {
    const evaluation = FiscalProductionActivationClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionActivationClosureStatus.FINAL_RELEASE_HANDOFF_EVIDENCE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

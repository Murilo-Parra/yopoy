import { FiscalFinalGoLiveClosureInput, FiscalFinalGoLiveClosureResult, FiscalFinalGoLiveClosureStatus } from './FiscalFinalGoLiveClosureTypes';
import { FiscalFinalGoLiveClosureEvaluationService } from './FiscalFinalGoLiveClosureEvaluationService';

export class FiscalFinalGoLiveClosureDecisionService {
  public static simulateDecision(input: FiscalFinalGoLiveClosureInput): FiscalFinalGoLiveClosureResult {
    const evaluation = FiscalFinalGoLiveClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalFinalGoLiveClosureStatus.NO_ACTIVATION_HANDOFF_EVIDENCE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

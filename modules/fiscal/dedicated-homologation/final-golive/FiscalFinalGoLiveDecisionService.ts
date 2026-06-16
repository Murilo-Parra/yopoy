import { FiscalFinalGoLiveInput, FiscalFinalGoLiveResult, FiscalFinalGoLiveStatus } from './FiscalFinalGoLiveTypes';
import { FiscalFinalGoLiveEvaluationService } from './FiscalFinalGoLiveEvaluationService';

export class FiscalFinalGoLiveDecisionService {
  public static simulateDecision(input: FiscalFinalGoLiveInput): FiscalFinalGoLiveResult {
    const evaluation = FiscalFinalGoLiveEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalFinalGoLiveStatus.ZERO_EXECUTION_ACTIVATION_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

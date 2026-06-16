import { FiscalFinalGoLiveGateDryRunInput, FiscalFinalGoLiveGateDryRunResult, FiscalFinalGoLiveGateDryRunStatus } from './FiscalFinalGoLiveGateDryRunTypes';
import { FiscalFinalGoLiveGateDryRunEvaluationService } from './FiscalFinalGoLiveGateDryRunEvaluationService';

export class FiscalFinalGoLiveGateDryRunDecisionService {
  public static simulateDecision(input: FiscalFinalGoLiveGateDryRunInput): FiscalFinalGoLiveGateDryRunResult {
    const evaluation = FiscalFinalGoLiveGateDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalFinalGoLiveGateDryRunStatus.MOCK_ACTIVATION_RUNBOOK_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

import { FiscalRouteTransitionInput, FiscalRouteTransitionResult, FiscalRouteTransitionStatus } from './FiscalRouteTransitionTypes';
import { FiscalRouteTransitionEvaluationService } from './FiscalRouteTransitionEvaluationService';

export class FiscalRouteTransitionDecisionService {
  public static simulateDecision(input: FiscalRouteTransitionInput): FiscalRouteTransitionResult {
    const evaluation = FiscalRouteTransitionEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRouteTransitionStatus.LEGACY_PRESERVATION_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

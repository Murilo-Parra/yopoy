import { FiscalRouteTransitionClosureInput, FiscalRouteTransitionClosureResult, FiscalRouteTransitionClosureStatus } from './FiscalRouteTransitionClosureTypes';
import { FiscalRouteTransitionClosureEvaluationService } from './FiscalRouteTransitionClosureEvaluationService';

export class FiscalRouteTransitionClosureDecisionService {
  public static simulateDecision(input: FiscalRouteTransitionClosureInput): FiscalRouteTransitionClosureResult {
    const evaluation = FiscalRouteTransitionClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRouteTransitionClosureStatus.PRODUCTION_HANDOFF_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

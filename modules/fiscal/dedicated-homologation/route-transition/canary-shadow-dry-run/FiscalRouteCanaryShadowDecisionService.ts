import { FiscalRouteCanaryShadowInput, FiscalRouteCanaryShadowResult, FiscalRouteCanaryShadowStatus } from './FiscalRouteCanaryShadowDryRunTypes';
import { FiscalRouteCanaryShadowEvaluationService } from './FiscalRouteCanaryShadowEvaluationService';

export class FiscalRouteCanaryShadowDecisionService {
  public static simulateDecision(input: FiscalRouteCanaryShadowInput): FiscalRouteCanaryShadowResult {
    const evaluation = FiscalRouteCanaryShadowEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRouteCanaryShadowStatus.TRAFFIC_MIRROR_APPROVAL_GATE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

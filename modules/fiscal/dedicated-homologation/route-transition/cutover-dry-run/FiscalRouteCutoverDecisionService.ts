import { FiscalRouteCutoverInput, FiscalRouteCutoverResult, FiscalRouteCutoverStatus } from './FiscalRouteCutoverDryRunTypes';
import { FiscalRouteCutoverEvaluationService } from './FiscalRouteCutoverEvaluationService';

export class FiscalRouteCutoverDecisionService {
  public static simulateDecision(input: FiscalRouteCutoverInput): FiscalRouteCutoverResult {
    const evaluation = FiscalRouteCutoverEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRouteCutoverStatus.SHADOW_ROLLBACK_GOVERNANCE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

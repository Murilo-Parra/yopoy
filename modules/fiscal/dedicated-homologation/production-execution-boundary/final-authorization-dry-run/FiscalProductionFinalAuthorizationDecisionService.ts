import { FiscalProductionFinalAuthorizationInput, FiscalProductionFinalAuthorizationResult, FiscalProductionFinalAuthorizationStatus } from './FiscalProductionFinalAuthorizationTypes';
import { FiscalProductionFinalAuthorizationEvaluationService } from './FiscalProductionFinalAuthorizationEvaluationService';

export class FiscalProductionFinalAuthorizationDecisionService {
  public static simulateDecision(input: FiscalProductionFinalAuthorizationInput): FiscalProductionFinalAuthorizationResult {
    const evaluation = FiscalProductionFinalAuthorizationEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionFinalAuthorizationStatus.LOCKED_GATE_HANDOFF_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

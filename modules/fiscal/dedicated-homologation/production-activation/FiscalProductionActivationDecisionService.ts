import { FiscalProductionActivationInput, FiscalProductionActivationResult, FiscalProductionActivationStatus } from './FiscalProductionActivationTypes';
import { FiscalProductionActivationEvaluationService } from './FiscalProductionActivationEvaluationService';

export class FiscalProductionActivationDecisionService {
  public static simulateDecision(input: FiscalProductionActivationInput): FiscalProductionActivationResult {
    const evaluation = FiscalProductionActivationEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionActivationStatus.ZERO_EXECUTION_RELEASE_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

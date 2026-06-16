import { FiscalProductionOperationsTransitionClosureInput, FiscalProductionOperationsTransitionClosureResult } from './FiscalProductionOperationsTransitionClosureTypes';
import { FiscalProductionOperationsTransitionClosureEvaluationService } from './FiscalProductionOperationsTransitionClosureEvaluationService';

export class FiscalProductionOperationsTransitionClosureDecisionService {
  public static simulateDecision(input: FiscalProductionOperationsTransitionClosureInput): FiscalProductionOperationsTransitionClosureResult {
    return FiscalProductionOperationsTransitionClosureEvaluationService.evaluate(input);
  }
}

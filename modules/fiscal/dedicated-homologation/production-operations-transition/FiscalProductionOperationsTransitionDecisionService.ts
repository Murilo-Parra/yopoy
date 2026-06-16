import { FiscalProductionOperationsTransitionInput, FiscalProductionOperationsTransitionResult } from './FiscalProductionOperationsTransitionTypes';
import { FiscalProductionOperationsTransitionEvaluationService } from './FiscalProductionOperationsTransitionEvaluationService';

export class FiscalProductionOperationsTransitionDecisionService {
  public static simulateDecision(input: FiscalProductionOperationsTransitionInput): FiscalProductionOperationsTransitionResult {
    return FiscalProductionOperationsTransitionEvaluationService.evaluate(input);
  }
}

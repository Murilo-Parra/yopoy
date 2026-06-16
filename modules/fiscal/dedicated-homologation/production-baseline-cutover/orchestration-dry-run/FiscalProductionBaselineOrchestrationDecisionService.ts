import { FiscalProductionBaselineOrchestrationInput, FiscalProductionBaselineOrchestrationResult } from './FiscalProductionBaselineOrchestrationTypes';
import { FiscalProductionBaselineOrchestrationEvaluationService } from './FiscalProductionBaselineOrchestrationEvaluationService';

export class FiscalProductionBaselineOrchestrationDecisionService {
  public static simulateDecision(input: FiscalProductionBaselineOrchestrationInput): FiscalProductionBaselineOrchestrationResult {
    return FiscalProductionBaselineOrchestrationEvaluationService.evaluate(input);
  }
}

import { FiscalProductionBaselineCutoverInput, FiscalProductionBaselineCutoverResult } from './FiscalProductionBaselineCutoverTypes';
import { FiscalProductionBaselineCutoverEvaluationService } from './FiscalProductionBaselineCutoverEvaluationService';

export class FiscalProductionBaselineCutoverDecisionService {
  public static simulateDecision(input: FiscalProductionBaselineCutoverInput): FiscalProductionBaselineCutoverResult {
    return FiscalProductionBaselineCutoverEvaluationService.evaluate(input);
  }
}

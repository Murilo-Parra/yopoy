import { FiscalProductionBaselineCutoverClosureInput, FiscalProductionBaselineCutoverClosureResult } from './FiscalProductionBaselineCutoverClosureTypes';
import { FiscalProductionBaselineCutoverClosureEvaluationService } from './FiscalProductionBaselineCutoverClosureEvaluationService';

export class FiscalProductionBaselineCutoverClosureDecisionService {
  public static simulateDecision(input: FiscalProductionBaselineCutoverClosureInput): FiscalProductionBaselineCutoverClosureResult {
    return FiscalProductionBaselineCutoverClosureEvaluationService.evaluate(input);
  }
}

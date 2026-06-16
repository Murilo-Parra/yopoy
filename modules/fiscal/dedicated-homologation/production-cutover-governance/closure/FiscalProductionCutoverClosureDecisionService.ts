import { FiscalProductionCutoverClosureInput, FiscalProductionCutoverClosureResult } from './FiscalProductionCutoverClosureTypes';
import { FiscalProductionCutoverClosureEvaluationService } from './FiscalProductionCutoverClosureEvaluationService';

export class FiscalProductionCutoverClosureDecisionService {
  public static simulateDecision(input: FiscalProductionCutoverClosureInput): FiscalProductionCutoverClosureResult {
    return FiscalProductionCutoverClosureEvaluationService.evaluate(input);
  }
}

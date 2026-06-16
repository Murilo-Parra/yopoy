import { FiscalProductionBaselineRollbackInput, FiscalProductionBaselineRollbackResult } from './FiscalProductionBaselineRollbackTypes';
import { FiscalProductionRollbackReversionEvaluationService } from './FiscalProductionRollbackReversionEvaluationService';

export class FiscalProductionRollbackReversionDecisionService {
  public static simulateDecision(input: FiscalProductionBaselineRollbackInput): FiscalProductionBaselineRollbackResult {
    return FiscalProductionRollbackReversionEvaluationService.evaluate(input);
  }
}

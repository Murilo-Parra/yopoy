import { FiscalProductionOperationsReadinessInput, FiscalProductionOperationsReadinessResult } from './FiscalProductionOperationsReadinessTypes';
import { FiscalProductionOperationsReadinessEvaluationService } from './FiscalProductionOperationsReadinessEvaluationService';

export class FiscalProductionOperationsReadinessDecisionService {
  public static simulateDecision(input: FiscalProductionOperationsReadinessInput): FiscalProductionOperationsReadinessResult {
    return FiscalProductionOperationsReadinessEvaluationService.evaluate(input);
  }
}

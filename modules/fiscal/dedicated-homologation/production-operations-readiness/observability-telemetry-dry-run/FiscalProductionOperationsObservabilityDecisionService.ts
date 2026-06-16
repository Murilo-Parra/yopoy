import { FiscalProductionOperationsObservabilityInput, FiscalProductionOperationsObservabilityResult } from './FiscalProductionOperationsObservabilityTypes';
import { FiscalProductionOperationsObservabilityEvaluationService } from './FiscalProductionOperationsObservabilityEvaluationService';

export class FiscalProductionOperationsObservabilityDecisionService {
  public static simulateDecision(input: FiscalProductionOperationsObservabilityInput): FiscalProductionOperationsObservabilityResult {
    return FiscalProductionOperationsObservabilityEvaluationService.evaluate(input);
  }
}

import { FiscalProductionOperationsAccessHandoffInput, FiscalProductionOperationsAccessHandoffResult } from './FiscalProductionOperationsAccessHandoffTypes';
import { FiscalProductionOperationsAccessHandoffEvaluationService } from './FiscalProductionOperationsAccessHandoffEvaluationService';

export class FiscalProductionOperationsAccessHandoffDecisionService {
  public static simulateDecision(input: FiscalProductionOperationsAccessHandoffInput): FiscalProductionOperationsAccessHandoffResult {
    return FiscalProductionOperationsAccessHandoffEvaluationService.evaluate(input);
  }
}

import { FiscalProductionRollbackAbortInput, FiscalProductionRollbackAbortResult } from './FiscalProductionRollbackAbortTypes';
import { FiscalProductionRollbackAbortEvaluationService } from './FiscalProductionRollbackAbortEvaluationService';

export class FiscalProductionRollbackAbortDecisionService {
  public static simulateDecision(input: FiscalProductionRollbackAbortInput): FiscalProductionRollbackAbortResult {
    return FiscalProductionRollbackAbortEvaluationService.evaluate(input);
  }
}

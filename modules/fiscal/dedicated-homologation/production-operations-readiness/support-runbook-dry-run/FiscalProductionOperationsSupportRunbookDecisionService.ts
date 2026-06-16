import { FiscalProductionOperationsSupportRunbookInput, FiscalProductionOperationsSupportRunbookResult } from './FiscalProductionOperationsSupportRunbookTypes';
import { FiscalProductionOperationsSupportRunbookEvaluationService } from './FiscalProductionOperationsSupportRunbookEvaluationService';

export class FiscalProductionOperationsSupportRunbookDecisionService {
  public static simulateDecision(input: FiscalProductionOperationsSupportRunbookInput): FiscalProductionOperationsSupportRunbookResult {
    return FiscalProductionOperationsSupportRunbookEvaluationService.evaluate(input);
  }
}

import { FiscalDay2OperationsInput, FiscalDay2OperationsResult } from './FiscalDay2OperationsTypes';
import { FiscalDay2OperationsEvaluationService } from './FiscalDay2OperationsEvaluationService';

export class FiscalDay2OperationsDecisionService {
  public static simulateDecision(input: FiscalDay2OperationsInput): FiscalDay2OperationsResult {
    return FiscalDay2OperationsEvaluationService.evaluate(input);
  }
}

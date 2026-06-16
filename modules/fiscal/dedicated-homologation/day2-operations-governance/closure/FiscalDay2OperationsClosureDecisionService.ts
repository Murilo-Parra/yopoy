import { FiscalDay2OperationsClosureInput, FiscalDay2OperationsClosureResult } from './FiscalDay2OperationsClosureTypes';
import { FiscalDay2OperationsClosureEvaluationService } from './FiscalDay2OperationsClosureEvaluationService';

export class FiscalDay2OperationsClosureDecisionService {
  public static simulateDecision(input: FiscalDay2OperationsClosureInput): FiscalDay2OperationsClosureResult {
    return FiscalDay2OperationsClosureEvaluationService.evaluate(input);
  }
}

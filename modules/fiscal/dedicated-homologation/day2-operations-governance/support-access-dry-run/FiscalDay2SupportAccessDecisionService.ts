import { FiscalDay2SupportAccessInput, FiscalDay2SupportAccessResult } from './FiscalDay2SupportAccessTypes';
import { FiscalDay2SupportAccessEvaluationService } from './FiscalDay2SupportAccessEvaluationService';

export class FiscalDay2SupportAccessDecisionService {
  public static simulateDecision(input: FiscalDay2SupportAccessInput): FiscalDay2SupportAccessResult {
    return FiscalDay2SupportAccessEvaluationService.evaluate(input);
  }
}

import { FiscalDay2IncidentRunbookInput, FiscalDay2IncidentRunbookResult } from './FiscalDay2IncidentRunbookTypes';
import { FiscalDay2IncidentRunbookEvaluationService } from './FiscalDay2IncidentRunbookEvaluationService';

export class FiscalDay2IncidentRunbookDecisionService {
  public static simulateDecision(input: FiscalDay2IncidentRunbookInput): FiscalDay2IncidentRunbookResult {
    return FiscalDay2IncidentRunbookEvaluationService.evaluate(input);
  }
}

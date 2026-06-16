import { FiscalDay2ObservabilityDriftInput, FiscalDay2ObservabilityDriftResult } from './FiscalDay2ObservabilityDriftTypes';
import { FiscalDay2ObservabilityDriftEvaluationService } from './FiscalDay2ObservabilityDriftEvaluationService';

export class FiscalDay2ObservabilityDriftDecisionService {
  public static simulateDecision(input: FiscalDay2ObservabilityDriftInput): FiscalDay2ObservabilityDriftResult {
    return FiscalDay2ObservabilityDriftEvaluationService.evaluate(input);
  }
}

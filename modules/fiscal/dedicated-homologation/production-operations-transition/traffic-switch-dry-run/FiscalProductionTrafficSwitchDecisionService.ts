import { FiscalProductionTrafficSwitchInput, FiscalProductionTrafficSwitchResult } from './FiscalProductionTrafficSwitchTypes';
import { FiscalProductionTrafficSwitchEvaluationService } from './FiscalProductionTrafficSwitchEvaluationService';

export class FiscalProductionTrafficSwitchDecisionService {
  public static simulateDecision(input: FiscalProductionTrafficSwitchInput): FiscalProductionTrafficSwitchResult {
    return FiscalProductionTrafficSwitchEvaluationService.evaluate(input);
  }
}

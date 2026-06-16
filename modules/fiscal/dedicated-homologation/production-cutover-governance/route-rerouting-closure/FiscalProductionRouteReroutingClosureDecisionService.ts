import { FiscalProductionRouteReroutingClosureInput, FiscalProductionRouteReroutingClosureResult } from './FiscalProductionRouteReroutingClosureTypes';
import { FiscalProductionRouteReroutingClosureEvaluationService } from './FiscalProductionRouteReroutingClosureEvaluationService';

export class FiscalProductionRouteReroutingClosureDecisionService {
  public static simulateDecision(input: FiscalProductionRouteReroutingClosureInput): FiscalProductionRouteReroutingClosureResult {
    return FiscalProductionRouteReroutingClosureEvaluationService.evaluate(input);
  }
}

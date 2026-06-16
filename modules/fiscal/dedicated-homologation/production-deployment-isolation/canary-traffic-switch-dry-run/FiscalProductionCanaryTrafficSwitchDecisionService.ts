import { FiscalProductionCanaryTrafficSwitchInput, FiscalProductionCanaryTrafficSwitchResult, FiscalProductionCanaryTrafficSwitchStatus } from './FiscalProductionCanaryTrafficSwitchTypes';
import { FiscalProductionCanaryTrafficSwitchEvaluationService } from './FiscalProductionCanaryTrafficSwitchEvaluationService';

export class FiscalProductionCanaryTrafficSwitchDecisionService {
  public static simulateDecision(input: FiscalProductionCanaryTrafficSwitchInput): FiscalProductionCanaryTrafficSwitchResult {
    const evaluation = FiscalProductionCanaryTrafficSwitchEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionCanaryTrafficSwitchStatus.REVERSIBLE_ACTIVATION_SIMULATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

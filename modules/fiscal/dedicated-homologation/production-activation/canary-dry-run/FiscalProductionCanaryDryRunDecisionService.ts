import { FiscalProductionCanaryDryRunInput, FiscalProductionCanaryDryRunResult, FiscalProductionCanaryDryRunStatus } from './FiscalProductionCanaryDryRunTypes';
import { FiscalProductionCanaryDryRunEvaluationService } from './FiscalProductionCanaryDryRunEvaluationService';

export class FiscalProductionCanaryDryRunDecisionService {
  public static simulateDecision(input: FiscalProductionCanaryDryRunInput): FiscalProductionCanaryDryRunResult {
    const evaluation = FiscalProductionCanaryDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionCanaryDryRunStatus.TRAFFIC_SWITCH_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

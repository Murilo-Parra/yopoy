import { FiscalOperationalObservabilityDryRunInput, FiscalOperationalObservabilityDryRunResult, FiscalOperationalObservabilityDryRunStatus } from './FiscalOperationalObservabilityDryRunTypes';
import { FiscalOperationalObservabilityDryRunEvaluationService } from './FiscalOperationalObservabilityDryRunEvaluationService';

export class FiscalOperationalObservabilityDryRunDecisionService {
  public static simulateDecision(input: FiscalOperationalObservabilityDryRunInput): FiscalOperationalObservabilityDryRunResult {
    const evaluation = FiscalOperationalObservabilityDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalOperationalObservabilityDryRunStatus.ALERTING_GOVERNANCE_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

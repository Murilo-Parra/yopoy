import { FiscalSyntheticRouteDryRunInput, FiscalSyntheticRouteDryRunResult, FiscalSyntheticRouteDryRunStatus } from './FiscalSyntheticRouteDryRunTypes';
import { FiscalSyntheticRouteDryRunEvaluationService } from './FiscalSyntheticRouteDryRunEvaluationService';

export class FiscalSyntheticRouteDryRunDecisionService {
  public static simulateDecision(input: FiscalSyntheticRouteDryRunInput): FiscalSyntheticRouteDryRunResult {
    const evaluation = FiscalSyntheticRouteDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalSyntheticRouteDryRunStatus.RESPONSE_SHAPE_COMPARATOR_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

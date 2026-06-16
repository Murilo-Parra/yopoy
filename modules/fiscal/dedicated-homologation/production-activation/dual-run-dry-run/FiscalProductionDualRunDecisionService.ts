import { FiscalProductionDualRunInput, FiscalProductionDualRunResult, FiscalProductionDualRunStatus } from './FiscalProductionDualRunTypes';
import { FiscalProductionDualRunEvaluationService } from './FiscalProductionDualRunEvaluationService';

export class FiscalProductionDualRunDecisionService {
  public static simulateDecision(input: FiscalProductionDualRunInput): FiscalProductionDualRunResult {
    const evaluation = FiscalProductionDualRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionDualRunStatus.REVERSIBLE_ACTIVATION_TELEMETRY_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

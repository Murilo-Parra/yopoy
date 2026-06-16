import { FiscalLegalSignatureDryRunInput, FiscalLegalSignatureDryRunResult, FiscalLegalSignatureDryRunStatus } from './FiscalLegalSignatureDryRunTypes';
import { FiscalLegalSignatureDryRunEvaluationService } from './FiscalLegalSignatureDryRunEvaluationService';

export class FiscalLegalSignatureDryRunDecisionService {
  public static simulateDecision(input: FiscalLegalSignatureDryRunInput): FiscalLegalSignatureDryRunResult {
    const evaluation = FiscalLegalSignatureDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalSignatureDryRunStatus.MOCK_SIGNATURE_WORKFLOW_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

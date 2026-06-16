import { FiscalLegalCommitteeDryRunInput, FiscalLegalCommitteeDryRunResult, FiscalLegalCommitteeDryRunStatus } from './FiscalLegalCommitteeDryRunTypes';
import { FiscalLegalCommitteeDryRunEvaluationService } from './FiscalLegalCommitteeDryRunEvaluationService';

export class FiscalLegalCommitteeDryRunDecisionService {
  public static simulateDecision(input: FiscalLegalCommitteeDryRunInput): FiscalLegalCommitteeDryRunResult {
    const evaluation = FiscalLegalCommitteeDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalCommitteeDryRunStatus.LEGAL_RISK_ACCEPTANCE_REVIEW_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

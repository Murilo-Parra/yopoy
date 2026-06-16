import { FiscalLegalSignOffClosureInput, FiscalLegalSignOffClosureResult, FiscalLegalSignOffClosureStatus } from './FiscalLegalSignOffClosureTypes';
import { FiscalLegalSignOffClosureEvaluationService } from './FiscalLegalSignOffClosureEvaluationService';

export class FiscalLegalSignOffClosureDecisionService {
  public static simulateDecision(input: FiscalLegalSignOffClosureInput): FiscalLegalSignOffClosureResult {
    const evaluation = FiscalLegalSignOffClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalSignOffClosureStatus.FINAL_LEGAL_EVIDENCE_HANDOFF_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

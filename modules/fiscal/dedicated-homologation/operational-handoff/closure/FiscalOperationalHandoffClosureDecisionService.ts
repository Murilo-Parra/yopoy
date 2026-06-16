import { FiscalOperationalHandoffClosureInput, FiscalOperationalHandoffClosureResult, FiscalOperationalHandoffClosureStatus } from './FiscalOperationalHandoffClosureTypes';
import { FiscalOperationalHandoffClosureEvaluationService } from './FiscalOperationalHandoffClosureEvaluationService';

export class FiscalOperationalHandoffClosureDecisionService {
  public static simulateDecision(input: FiscalOperationalHandoffClosureInput): FiscalOperationalHandoffClosureResult {
    const evaluation = FiscalOperationalHandoffClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalOperationalHandoffClosureStatus.LEGAL_SIGNOFF_READINESS_EVIDENCE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

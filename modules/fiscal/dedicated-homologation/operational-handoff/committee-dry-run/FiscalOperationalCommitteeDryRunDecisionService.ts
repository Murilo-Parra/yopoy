import { FiscalOperationalCommitteeDryRunInput, FiscalOperationalCommitteeDryRunResult, FiscalOperationalCommitteeDryRunStatus } from './FiscalOperationalCommitteeDryRunTypes';
import { FiscalOperationalCommitteeDryRunEvaluationService } from './FiscalOperationalCommitteeDryRunEvaluationService';

export class FiscalOperationalCommitteeDryRunDecisionService {
  public static simulateDecision(input: FiscalOperationalCommitteeDryRunInput): FiscalOperationalCommitteeDryRunResult {
    const evaluation = FiscalOperationalCommitteeDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalOperationalCommitteeDryRunStatus.COMMITTEE_APPROVAL_SIMULATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

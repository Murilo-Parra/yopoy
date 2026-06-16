import { FiscalProductionCommitteeDeliberationInput, FiscalProductionCommitteeDeliberationResult, FiscalProductionCommitteeDeliberationStatus } from './FiscalProductionCommitteeDeliberationTypes';
import { FiscalProductionCommitteeDeliberationEvaluationService } from './FiscalProductionCommitteeDeliberationEvaluationService';

export class FiscalProductionCommitteeDeliberationDecisionService {
  public static simulateDecision(input: FiscalProductionCommitteeDeliberationInput): FiscalProductionCommitteeDeliberationResult {
    const evaluation = FiscalProductionCommitteeDeliberationEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionCommitteeDeliberationStatus.NON_PERSISTENT_DELIBERATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

import { FiscalProductionCutoverGovernanceInput, FiscalProductionCutoverGovernanceResult, FiscalProductionCutoverGovernanceStatus } from './FiscalProductionCutoverGovernanceTypes';
import { FiscalProductionCutoverGovernanceEvaluationService } from './FiscalProductionCutoverGovernanceEvaluationService';

export class FiscalProductionCutoverGovernanceDecisionService {
  public static simulateDecision(input: FiscalProductionCutoverGovernanceInput): FiscalProductionCutoverGovernanceResult {
    const evaluation = FiscalProductionCutoverGovernanceEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionCutoverGovernanceStatus.LEGACY_PRESERVATION_PLAN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

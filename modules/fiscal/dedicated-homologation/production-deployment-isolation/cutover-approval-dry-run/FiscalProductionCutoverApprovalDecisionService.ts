import { FiscalProductionCutoverApprovalInput, FiscalProductionCutoverApprovalResult, FiscalProductionCutoverApprovalStatus } from './FiscalProductionCutoverApprovalTypes';
import { FiscalProductionCutoverApprovalEvaluationService } from './FiscalProductionCutoverApprovalEvaluationService';

export class FiscalProductionCutoverApprovalDecisionService {
  public static simulateDecision(input: FiscalProductionCutoverApprovalInput): FiscalProductionCutoverApprovalResult {
    const evaluation = FiscalProductionCutoverApprovalEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionCutoverApprovalStatus.ROLLBACK_GOVERNANCE_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

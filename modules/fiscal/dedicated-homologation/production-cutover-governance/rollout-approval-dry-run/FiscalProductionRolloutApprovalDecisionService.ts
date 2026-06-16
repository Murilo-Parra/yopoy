import { FiscalProductionRolloutApprovalInput, FiscalProductionRolloutApprovalResult } from './FiscalProductionRolloutApprovalTypes';
import { FiscalProductionRolloutApprovalEvaluationService } from './FiscalProductionRolloutApprovalEvaluationService';

export class FiscalProductionRolloutApprovalDecisionService {
  public static simulateDecision(input: FiscalProductionRolloutApprovalInput): FiscalProductionRolloutApprovalResult {
    return FiscalProductionRolloutApprovalEvaluationService.evaluate(input);
  }
}

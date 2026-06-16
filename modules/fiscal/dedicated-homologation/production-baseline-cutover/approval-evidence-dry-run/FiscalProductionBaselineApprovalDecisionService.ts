import { FiscalProductionBaselineApprovalInput, FiscalProductionBaselineApprovalResult } from './FiscalProductionBaselineApprovalTypes';
import { FiscalProductionBaselineApprovalEvaluationService } from './FiscalProductionBaselineApprovalEvaluationService';

export class FiscalProductionBaselineApprovalDecisionService {
  public static simulateDecision(input: FiscalProductionBaselineApprovalInput): FiscalProductionBaselineApprovalResult {
    return FiscalProductionBaselineApprovalEvaluationService.evaluate(input);
  }
}

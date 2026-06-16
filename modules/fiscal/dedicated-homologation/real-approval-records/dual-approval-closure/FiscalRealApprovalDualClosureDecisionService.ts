import { FiscalRealApprovalDualClosureInput, FiscalRealApprovalDualClosureResult, FiscalRealApprovalDualClosureStatus } from './FiscalRealApprovalDualClosureTypes';
import { FiscalRealApprovalDualClosureEvaluationService } from './FiscalRealApprovalDualClosureEvaluationService';

export class FiscalRealApprovalDualClosureDecisionService {
  public static simulateDecision(input: FiscalRealApprovalDualClosureInput): FiscalRealApprovalDualClosureResult {
    const evaluation = FiscalRealApprovalDualClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRealApprovalDualClosureStatus.DUAL_APPROVAL_CONCLUSION_SIMULATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

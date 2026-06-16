import { FiscalRealDualApprovalInput, FiscalRealDualApprovalResult, FiscalRealDualApprovalStatus } from './FiscalRealDualApprovalTypes';
import { FiscalRealDualApprovalPolicy } from './FiscalRealDualApprovalPolicy';
import { FiscalRealDualApprovalSimulationService } from './FiscalRealDualApprovalSimulationService';

export class FiscalRealDualApprovalEvaluationService {
  public static evaluate(input: FiscalRealDualApprovalInput): FiscalRealDualApprovalResult {
    const policyResult = FiscalRealDualApprovalPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealDualApprovalResult;
    }

    const sim = FiscalRealDualApprovalSimulationService.simulate(input);
    const result = FiscalRealDualApprovalPolicy.getBaseResult();

    return {
      ...result,
      status: FiscalRealDualApprovalStatus.DUAL_APPROVAL_SIMULATION_READY,
      validationExecuted: true,
      simulationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      sodReviewed: true,
      go: false,
      noGo: true,
      dualApprovalSimulated: true,
      dualApprovalCompleted: false,
      realApprovalGranted: false,
      realAuthorizationGranted: false
    };
  }
}

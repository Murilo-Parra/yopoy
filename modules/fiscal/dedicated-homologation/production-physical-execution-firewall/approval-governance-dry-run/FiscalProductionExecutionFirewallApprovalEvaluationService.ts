import { FiscalProductionExecutionFirewallApprovalInput } from './FiscalProductionExecutionFirewallApprovalTypes';
import { FiscalProductionExecutionFirewallApprovalValidator } from './FiscalProductionExecutionFirewallApprovalValidator';
import { FiscalProductionExecutionFirewallApprovalPolicy } from './FiscalProductionExecutionFirewallApprovalPolicy';
import { FiscalProductionExecutionFirewallApprovalPackage } from './FiscalProductionExecutionFirewallApprovalPackage';
import { FiscalProductionExecutiveSignOffSimulationMatrix } from './FiscalProductionExecutiveSignOffSimulationMatrix';
import { FiscalProductionFirewallApproverEligibilityMatrix } from './FiscalProductionFirewallApproverEligibilityMatrix';
import { FiscalProductionFirewallSeparationOfDutiesMatrix } from './FiscalProductionFirewallSeparationOfDutiesMatrix';
import { FiscalProductionFirewallApprovalScopeNoOpPlan } from './FiscalProductionFirewallApprovalScopeNoOpPlan';
import { FiscalProductionFirewallNoRealApprovalEvidence } from './FiscalProductionFirewallNoRealApprovalEvidence';
import { FiscalProductionFirewallNoGateUnlockEvidence } from './FiscalProductionFirewallNoGateUnlockEvidence';
import { FiscalProductionFirewallNoTokenIssueEvidence } from './FiscalProductionFirewallNoTokenIssueEvidence';
import { FiscalProductionFirewallAuthorizationBlockMatrix } from './FiscalProductionFirewallAuthorizationBlockMatrix';
import { FiscalProductionFirewallBoundaryDriftReviewMatrix } from './FiscalProductionFirewallBoundaryDriftReviewMatrix';
import { FiscalProductionExecutionFirewallApprovalDependencyMatrix } from './FiscalProductionExecutionFirewallApprovalDependencyMatrix';
import { FiscalProductionExecutionFirewallApprovalBlockerRegister } from './FiscalProductionExecutionFirewallApprovalBlockerRegister';
import { FiscalProductionExecutionFirewallApprovalRiskRegister } from './FiscalProductionExecutionFirewallApprovalRiskRegister';

export class FiscalProductionExecutionFirewallApprovalEvaluationService {
  public static evaluate(input: FiscalProductionExecutionFirewallApprovalInput) {
    FiscalProductionExecutionFirewallApprovalValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionExecutionFirewallApprovalPolicy.getPolicyMessage(),
      approvalPackage: FiscalProductionExecutionFirewallApprovalPackage.getPackage(),
      executiveSignOffSimulationMatrix: FiscalProductionExecutiveSignOffSimulationMatrix.getMatrix(),
      approverEligibilityMatrix: FiscalProductionFirewallApproverEligibilityMatrix.getMatrix(),
      separationOfDutiesMatrix: FiscalProductionFirewallSeparationOfDutiesMatrix.getMatrix(),
      approvalScopeNoOpPlan: FiscalProductionFirewallApprovalScopeNoOpPlan.getPlan(),
      noRealApprovalEvidence: FiscalProductionFirewallNoRealApprovalEvidence.getEvidence(),
      noGateUnlockEvidence: FiscalProductionFirewallNoGateUnlockEvidence.getEvidence(),
      noTokenIssueEvidence: FiscalProductionFirewallNoTokenIssueEvidence.getEvidence(),
      authorizationBlockMatrix: FiscalProductionFirewallAuthorizationBlockMatrix.getMatrix(),
      boundaryDriftReviewMatrix: FiscalProductionFirewallBoundaryDriftReviewMatrix.getMatrix(),
      dependencyMatrix: FiscalProductionExecutionFirewallApprovalDependencyMatrix.getMatrix(),
      blockers: FiscalProductionExecutionFirewallApprovalBlockerRegister.getBlockers(),
      risks: FiscalProductionExecutionFirewallApprovalRiskRegister.getRisks(),
    };
  }
}

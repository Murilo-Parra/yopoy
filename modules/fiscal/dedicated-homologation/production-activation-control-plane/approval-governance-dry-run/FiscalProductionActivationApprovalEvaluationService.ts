import { FiscalProductionActivationApprovalCharter } from './FiscalProductionActivationApprovalCharter';
import { FiscalProductionActivationStakeholderMatrix } from './FiscalProductionActivationStakeholderMatrix';
import { FiscalProductionActivationPreApprovalMatrix } from './FiscalProductionActivationPreApprovalMatrix';
import { FiscalProductionActivationEvidenceReviewMatrix } from './FiscalProductionActivationEvidenceReviewMatrix';
import { FiscalProductionActivationQuorumSimulation } from './FiscalProductionActivationQuorumSimulation';
import { FiscalProductionActivationVoteSimulation } from './FiscalProductionActivationVoteSimulation';
import { FiscalProductionActivationGoNoGoNoOpMatrix } from './FiscalProductionActivationGoNoGoNoOpMatrix';
import { FiscalProductionActivationRiskAcceptanceNoOpReview } from './FiscalProductionActivationRiskAcceptanceNoOpReview';
import { FiscalProductionActivationWaiverNoOpReview } from './FiscalProductionActivationWaiverNoOpReview';
import { FiscalProductionActivationNoRealAuthorizationEvidence } from './FiscalProductionActivationNoRealAuthorizationEvidence';
import { FiscalProductionActivationNoGateUnlockEvidence } from './FiscalProductionActivationNoGateUnlockEvidence';
import { FiscalProductionActivationApprovalDependencyMatrix } from './FiscalProductionActivationApprovalDependencyMatrix';
import { FiscalProductionActivationApprovalBlockerRegister } from './FiscalProductionActivationApprovalBlockerRegister';
import { FiscalProductionActivationApprovalRiskRegister } from './FiscalProductionActivationApprovalRiskRegister';
import { FiscalProductionActivationApprovalPolicy } from './FiscalProductionActivationApprovalPolicy';
import { FiscalProductionActivationApprovalValidator } from './FiscalProductionActivationApprovalValidator';
import { FiscalProductionActivationApprovalInput } from './FiscalProductionActivationApprovalTypes';

export class FiscalProductionActivationApprovalEvaluationService {
  public static evaluate(input: FiscalProductionActivationApprovalInput) {
    FiscalProductionActivationApprovalValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionActivationApprovalPolicy.getPolicyMessage(),
      approvalCharter: FiscalProductionActivationApprovalCharter.getCharter(),
      stakeholderMatrix: FiscalProductionActivationStakeholderMatrix.getMatrix(),
      preApprovalMatrix: FiscalProductionActivationPreApprovalMatrix.getMatrix(),
      evidenceReviewMatrix: FiscalProductionActivationEvidenceReviewMatrix.getMatrix(),
      quorumSimulation: FiscalProductionActivationQuorumSimulation.simulate(),
      voteSimulation: FiscalProductionActivationVoteSimulation.simulate(),
      goNoGoNoOpMatrix: FiscalProductionActivationGoNoGoNoOpMatrix.getMatrix(),
      riskAcceptanceNoOpReview: FiscalProductionActivationRiskAcceptanceNoOpReview.simulate(),
      waiverNoOpReview: FiscalProductionActivationWaiverNoOpReview.simulate(),
      noRealAuthorizationEvidence: FiscalProductionActivationNoRealAuthorizationEvidence.getEvidence(),
      noGateUnlockEvidence: FiscalProductionActivationNoGateUnlockEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionActivationApprovalDependencyMatrix.getMatrix(),
      blockers: FiscalProductionActivationApprovalBlockerRegister.getBlockers(),
      risks: FiscalProductionActivationApprovalRiskRegister.getRisks()
    };
  }
}

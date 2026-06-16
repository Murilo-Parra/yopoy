import { FiscalProductionComplianceReleaseGatekeeperInput } from './FiscalProductionComplianceReleaseGatekeeperTypes';
import { FiscalProductionComplianceReleaseGatekeeperPolicy } from './FiscalProductionComplianceReleaseGatekeeperPolicy';
import { FiscalProductionComplianceReleaseGatekeeperValidator } from './FiscalProductionComplianceReleaseGatekeeperValidator';
import { FiscalProductionComplianceReleaseValidationBlueprint } from './FiscalProductionComplianceReleaseValidationBlueprint';
import { FiscalProductionRegulatoryGatekeeperNoOpContract } from './FiscalProductionRegulatoryGatekeeperNoOpContract';
import { FiscalProductionComplianceReleaseReadinessSimulationMatrix } from './FiscalProductionComplianceReleaseReadinessSimulationMatrix';
import { FiscalProductionComplianceReleaseBlockerSimulationMatrix } from './FiscalProductionComplianceReleaseBlockerSimulationMatrix';
import { FiscalProductionRegulatoryGateNoUnlockPlan } from './FiscalProductionRegulatoryGateNoUnlockPlan';
import { FiscalProductionFindingClearanceNoPersistenceMatrix } from './FiscalProductionFindingClearanceNoPersistenceMatrix';
import { FiscalProductionRemediationAcceptanceNoOpPlan } from './FiscalProductionRemediationAcceptanceNoOpPlan';
import { FiscalProductionFilingStatusNoSubmitReviewMatrix } from './FiscalProductionFilingStatusNoSubmitReviewMatrix';
import { FiscalProductionReleaseHoldNoActivationPlan } from './FiscalProductionReleaseHoldNoActivationPlan';
import { FiscalProductionNoReleaseApprovalEvidence } from './FiscalProductionNoReleaseApprovalEvidence';
import { FiscalProductionNoRegulatoryGateUnlockEvidence } from './FiscalProductionNoRegulatoryGateUnlockEvidence';
import { FiscalProductionComplianceReleaseGatekeeperDependencyMatrix } from './FiscalProductionComplianceReleaseGatekeeperDependencyMatrix';
import { FiscalProductionComplianceReleaseGatekeeperBlockerRegister } from './FiscalProductionComplianceReleaseGatekeeperBlockerRegister';
import { FiscalProductionComplianceReleaseGatekeeperRiskRegister } from './FiscalProductionComplianceReleaseGatekeeperRiskRegister';

export class FiscalProductionComplianceReleaseGatekeeperEvaluationService {
  public static evaluate(input: FiscalProductionComplianceReleaseGatekeeperInput) {
    FiscalProductionComplianceReleaseGatekeeperValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionComplianceReleaseGatekeeperPolicy.getPolicyMessage(),
      releaseValidationBlueprint: FiscalProductionComplianceReleaseValidationBlueprint.getBlueprint(),
      regulatoryGatekeeperNoOpContract: FiscalProductionRegulatoryGatekeeperNoOpContract.getContract(),
      releaseReadinessSimulationMatrix: FiscalProductionComplianceReleaseReadinessSimulationMatrix.getMatrix(),
      releaseBlockerSimulationMatrix: FiscalProductionComplianceReleaseBlockerSimulationMatrix.getMatrix(),
      regulatoryGateNoUnlockPlan: FiscalProductionRegulatoryGateNoUnlockPlan.getPlan(),
      findingClearanceNoPersistenceMatrix: FiscalProductionFindingClearanceNoPersistenceMatrix.getMatrix(),
      remediationAcceptanceNoOpPlan: FiscalProductionRemediationAcceptanceNoOpPlan.getPlan(),
      filingStatusNoSubmitReviewMatrix: FiscalProductionFilingStatusNoSubmitReviewMatrix.getMatrix(),
      releaseHoldNoActivationPlan: FiscalProductionReleaseHoldNoActivationPlan.getPlan(),
      noReleaseApprovalEvidence: FiscalProductionNoReleaseApprovalEvidence.getEvidence(),
      noRegulatoryGateUnlockEvidence: FiscalProductionNoRegulatoryGateUnlockEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionComplianceReleaseGatekeeperDependencyMatrix.getMatrix(),
      blockers: FiscalProductionComplianceReleaseGatekeeperBlockerRegister.getBlockers(),
      risks: FiscalProductionComplianceReleaseGatekeeperRiskRegister.getRisks(),
    };
  }
}

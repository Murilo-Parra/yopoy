import { FiscalOperationalCommitteeDryRunInput, FiscalOperationalCommitteeDryRunResult } from './FiscalOperationalCommitteeDryRunTypes';
import { FiscalOperationalCommitteeDryRunPolicy } from './FiscalOperationalCommitteeDryRunPolicy';
import { FiscalOperationalArchitectureCommitteeCharter } from './FiscalOperationalArchitectureCommitteeCharter';
import { FiscalOperationalRiskCommitteeApprovalMatrix } from './FiscalOperationalRiskCommitteeApprovalMatrix';
import { FiscalOperationalCommitteeQuorumSimulation } from './FiscalOperationalCommitteeQuorumSimulation';
import { FiscalOperationalRiskAcceptanceSimulation } from './FiscalOperationalRiskAcceptanceSimulation';
import { FiscalOperationalExceptionWaiverSimulation } from './FiscalOperationalExceptionWaiverSimulation';
import { FiscalOperationalEvidenceReviewMatrix } from './FiscalOperationalEvidenceReviewMatrix';
import { FiscalOperationalCommitteeFinalRecommendation } from './FiscalOperationalCommitteeFinalRecommendation';
import { FiscalOperationalCommitteeDryRunBlockerRegister } from './FiscalOperationalCommitteeDryRunBlockerRegister';
import { FiscalOperationalCommitteeDryRunRiskRegister } from './FiscalOperationalCommitteeDryRunRiskRegister';

export class FiscalOperationalCommitteeDryRunEvaluationService {
  public static evaluate(input: FiscalOperationalCommitteeDryRunInput): FiscalOperationalCommitteeDryRunResult {
    const policyResult = FiscalOperationalCommitteeDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalOperationalCommitteeDryRunResult;
    }

    FiscalOperationalArchitectureCommitteeCharter.generateCharter();
    FiscalOperationalRiskCommitteeApprovalMatrix.generateMatrix();
    FiscalOperationalCommitteeQuorumSimulation.generateSimulation();
    FiscalOperationalRiskAcceptanceSimulation.generateSimulation();
    FiscalOperationalExceptionWaiverSimulation.generateSimulation();
    FiscalOperationalEvidenceReviewMatrix.generateMatrix();
    FiscalOperationalCommitteeFinalRecommendation.generateRecommendation();

    const baseResult = FiscalOperationalCommitteeDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalOperationalCommitteeDryRunBlockerRegister.getBlockers(),
      warnings: FiscalOperationalCommitteeDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

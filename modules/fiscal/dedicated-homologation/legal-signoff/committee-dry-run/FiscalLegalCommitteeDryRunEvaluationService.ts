import { FiscalLegalCommitteeDryRunInput, FiscalLegalCommitteeDryRunResult } from './FiscalLegalCommitteeDryRunTypes';
import { FiscalLegalCommitteeDryRunPolicy } from './FiscalLegalCommitteeDryRunPolicy';
import { FiscalLegalCommitteeCharter } from './FiscalLegalCommitteeCharter';
import { FiscalLegalCommitteeApprovalMatrix } from './FiscalLegalCommitteeApprovalMatrix';
import { FiscalLegalCommitteeQuorumSimulation } from './FiscalLegalCommitteeQuorumSimulation';
import { FiscalLegalRiskAcceptanceReview } from './FiscalLegalRiskAcceptanceReview';
import { FiscalLegalWaiverReview } from './FiscalLegalWaiverReview';
import { FiscalLegalSignatureEvidenceReviewMatrix } from './FiscalLegalSignatureEvidenceReviewMatrix';
import { FiscalLegalCommitteeFinalRecommendation } from './FiscalLegalCommitteeFinalRecommendation';
import { FiscalLegalCommitteeDryRunBlockerRegister } from './FiscalLegalCommitteeDryRunBlockerRegister';
import { FiscalLegalCommitteeDryRunRiskRegister } from './FiscalLegalCommitteeDryRunRiskRegister';

export class FiscalLegalCommitteeDryRunEvaluationService {
  public static evaluate(input: FiscalLegalCommitteeDryRunInput): FiscalLegalCommitteeDryRunResult {
    const policyResult = FiscalLegalCommitteeDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalCommitteeDryRunResult;
    }

    FiscalLegalCommitteeCharter.generateCharter();
    FiscalLegalCommitteeApprovalMatrix.generateMatrix();
    FiscalLegalCommitteeQuorumSimulation.simulateQuorum();
    FiscalLegalRiskAcceptanceReview.simulateReview();
    FiscalLegalWaiverReview.simulateReview();
    FiscalLegalSignatureEvidenceReviewMatrix.simulateReview();
    FiscalLegalCommitteeFinalRecommendation.generateRecommendation();

    const baseResult = FiscalLegalCommitteeDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalCommitteeDryRunBlockerRegister.getBlockers(),
      warnings: FiscalLegalCommitteeDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

import { FiscalProductionCommitteeDeliberationInput, FiscalProductionCommitteeDeliberationResult } from './FiscalProductionCommitteeDeliberationTypes';
import { FiscalProductionCommitteeDeliberationPolicy } from './FiscalProductionCommitteeDeliberationPolicy';
import { FiscalProductionCommitteeCharter } from './FiscalProductionCommitteeCharter';
import { FiscalProductionCommitteeQuorumMatrix } from './FiscalProductionCommitteeQuorumMatrix';
import { FiscalProductionCommitteeVoteSimulation } from './FiscalProductionCommitteeVoteSimulation';
import { FiscalProductionCommitteePolicyReview } from './FiscalProductionCommitteePolicyReview';
import { FiscalProductionPolicyEvidenceRecorder } from './FiscalProductionPolicyEvidenceRecorder';
import { FiscalProductionCommitteeGoNoGoMatrix } from './FiscalProductionCommitteeGoNoGoMatrix';
import { FiscalProductionCommitteeDeliberationTrail } from './FiscalProductionCommitteeDeliberationTrail';
import { FiscalProductionCommitteeDependencyMatrix } from './FiscalProductionCommitteeDependencyMatrix';
import { FiscalProductionCommitteeDeliberationBlockerRegister } from './FiscalProductionCommitteeDeliberationBlockerRegister';
import { FiscalProductionCommitteeDeliberationRiskRegister } from './FiscalProductionCommitteeDeliberationRiskRegister';

export class FiscalProductionCommitteeDeliberationEvaluationService {
  public static evaluate(input: FiscalProductionCommitteeDeliberationInput): FiscalProductionCommitteeDeliberationResult {
    const policyResult = FiscalProductionCommitteeDeliberationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionCommitteeDeliberationResult;
    }

    FiscalProductionCommitteeCharter.generateCharter();
    FiscalProductionCommitteeQuorumMatrix.generateMatrix();
    FiscalProductionCommitteeVoteSimulation.simulateVotes();
    FiscalProductionCommitteePolicyReview.generateReview();
    FiscalProductionPolicyEvidenceRecorder.recordEvidence();
    FiscalProductionCommitteeGoNoGoMatrix.generateMatrix();
    FiscalProductionCommitteeDeliberationTrail.generateTrail();
    FiscalProductionCommitteeDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionCommitteeDeliberationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionCommitteeDeliberationBlockerRegister.getBlockers(),
      warnings: FiscalProductionCommitteeDeliberationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

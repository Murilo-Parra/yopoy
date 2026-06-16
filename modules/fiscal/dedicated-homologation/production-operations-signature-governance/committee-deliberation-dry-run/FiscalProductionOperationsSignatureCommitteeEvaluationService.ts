import { FiscalProductionOperationsSignatureCommitteeCharter } from './FiscalProductionOperationsSignatureCommitteeCharter';
import { FiscalProductionOperationsSignatureCommitteeQuorumMatrix } from './FiscalProductionOperationsSignatureCommitteeQuorumMatrix';
import { FiscalProductionOperationsConsentEvidenceReviewMatrix } from './FiscalProductionOperationsConsentEvidenceReviewMatrix';
import { FiscalProductionOperationsMockAttestationReviewMatrix } from './FiscalProductionOperationsMockAttestationReviewMatrix';
import { FiscalProductionOperationsSignatureSoDRevalidationMatrix } from './FiscalProductionOperationsSignatureSoDRevalidationMatrix';
import { FiscalProductionOperationsCommitteeVoteSimulation } from './FiscalProductionOperationsCommitteeVoteSimulation';
import { FiscalProductionOperationsConsentDecisionNoOpMatrix } from './FiscalProductionOperationsConsentDecisionNoOpMatrix';
import { FiscalProductionOperationsRiskAcceptanceNoOpReview } from './FiscalProductionOperationsRiskAcceptanceNoOpReview';
import { FiscalProductionOperationsWaiverNoOpReview } from './FiscalProductionOperationsWaiverNoOpReview';
import { FiscalProductionOperationsCommitteeFinalRecommendation } from './FiscalProductionOperationsCommitteeFinalRecommendation';
import { FiscalProductionOperationsDeliberationNoPersistenceEvidence } from './FiscalProductionOperationsDeliberationNoPersistenceEvidence';
import { FiscalProductionOperationsNoRealAuthorizationEvidence } from './FiscalProductionOperationsNoRealAuthorizationEvidence';
import { FiscalProductionOperationsSignatureCommitteeDependencyMatrix } from './FiscalProductionOperationsSignatureCommitteeDependencyMatrix';
import { FiscalProductionOperationsSignatureCommitteeBlockerRegister } from './FiscalProductionOperationsSignatureCommitteeBlockerRegister';
import { FiscalProductionOperationsSignatureCommitteeRiskRegister } from './FiscalProductionOperationsSignatureCommitteeRiskRegister';
import { FiscalProductionOperationsSignatureCommitteePolicy } from './FiscalProductionOperationsSignatureCommitteePolicy';
import { FiscalProductionOperationsSignatureCommitteeValidator } from './FiscalProductionOperationsSignatureCommitteeValidator';
import { FiscalProductionOperationsSignatureCommitteeInput } from './FiscalProductionOperationsSignatureCommitteeTypes';

export class FiscalProductionOperationsSignatureCommitteeEvaluationService {
  public static evaluate(input: FiscalProductionOperationsSignatureCommitteeInput) {
    FiscalProductionOperationsSignatureCommitteeValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionOperationsSignatureCommitteePolicy.getPolicyMessage(),
      charter: FiscalProductionOperationsSignatureCommitteeCharter.getCharter(),
      quorumMatrix: FiscalProductionOperationsSignatureCommitteeQuorumMatrix.getMatrix(),
      consentEvidenceReviewMatrix: FiscalProductionOperationsConsentEvidenceReviewMatrix.getMatrix(),
      mockAttestationReviewMatrix: FiscalProductionOperationsMockAttestationReviewMatrix.getMatrix(),
      signatureSoDRevalidationMatrix: FiscalProductionOperationsSignatureSoDRevalidationMatrix.getMatrix(),
      voteSimulation: FiscalProductionOperationsCommitteeVoteSimulation.simulate(),
      consentDecisionNoOpMatrix: FiscalProductionOperationsConsentDecisionNoOpMatrix.getMatrix(),
      riskAcceptanceNoOpReview: FiscalProductionOperationsRiskAcceptanceNoOpReview.getReview(),
      waiverNoOpReview: FiscalProductionOperationsWaiverNoOpReview.getReview(),
      finalRecommendation: FiscalProductionOperationsCommitteeFinalRecommendation.getRecommendation(),
      deliberationNoPersistenceEvidence: FiscalProductionOperationsDeliberationNoPersistenceEvidence.getEvidence(),
      noRealAuthorizationEvidence: FiscalProductionOperationsNoRealAuthorizationEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionOperationsSignatureCommitteeDependencyMatrix.getMatrix(),
      blockers: FiscalProductionOperationsSignatureCommitteeBlockerRegister.getBlockers(),
      risks: FiscalProductionOperationsSignatureCommitteeRiskRegister.getRisks()
    };
  }
}

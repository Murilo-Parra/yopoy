import { FiscalProductionOperationsStakeholderSignatureEvidenceCollection } from './FiscalProductionOperationsStakeholderSignatureEvidenceCollection';
import { FiscalProductionOperationsMockAttestationEnvelope } from './FiscalProductionOperationsMockAttestationEnvelope';
import { FiscalProductionOperationsSignerEligibilityReviewMatrix } from './FiscalProductionOperationsSignerEligibilityReviewMatrix';
import { FiscalProductionOperationsStakeholderQuorumSimulation } from './FiscalProductionOperationsStakeholderQuorumSimulation';
import { FiscalProductionOperationsStakeholderSoDReview } from './FiscalProductionOperationsStakeholderSoDReview';
import { FiscalProductionOperationsAttestationEvidenceReview } from './FiscalProductionOperationsAttestationEvidenceReview';
import { FiscalProductionOperationsAttestationDivergenceMatrix } from './FiscalProductionOperationsAttestationDivergenceMatrix';
import { FiscalProductionOperationsNoRealStakeholderNotificationEvidence } from './FiscalProductionOperationsNoRealStakeholderNotificationEvidence';
import { FiscalProductionOperationsNoRealSignaturePersistenceEvidence } from './FiscalProductionOperationsNoRealSignaturePersistenceEvidence';
import { FiscalProductionOperationsStakeholderSignatureDependencyMatrix } from './FiscalProductionOperationsStakeholderSignatureDependencyMatrix';
import { FiscalProductionOperationsStakeholderSignaturePolicy } from './FiscalProductionOperationsStakeholderSignaturePolicy';
import { FiscalProductionOperationsStakeholderSignatureBlockerRegister } from './FiscalProductionOperationsStakeholderSignatureBlockerRegister';
import { FiscalProductionOperationsStakeholderSignatureRiskRegister } from './FiscalProductionOperationsStakeholderSignatureRiskRegister';
import { FiscalProductionOperationsStakeholderSignatureValidator } from './FiscalProductionOperationsStakeholderSignatureValidator';
import { FiscalProductionOperationsStakeholderSignatureInput } from './FiscalProductionOperationsStakeholderSignatureTypes';

export class FiscalProductionOperationsStakeholderSignatureEvaluationService {
  public static evaluate(input: FiscalProductionOperationsStakeholderSignatureInput) {
    FiscalProductionOperationsStakeholderSignatureValidator.validate(input);

    return {
      evaluationExecuted: true,
      policy: FiscalProductionOperationsStakeholderSignaturePolicy.getPolicyMessage(),
      evidenceCollection: FiscalProductionOperationsStakeholderSignatureEvidenceCollection.simulateCollection(),
      mockEnvelope: FiscalProductionOperationsMockAttestationEnvelope.getEnvelope(),
      eligibilityReview: FiscalProductionOperationsSignerEligibilityReviewMatrix.getMatrix(),
      quorumSimulation: FiscalProductionOperationsStakeholderQuorumSimulation.simulate(),
      sodReview: FiscalProductionOperationsStakeholderSoDReview.getReview(),
      evidenceReview: FiscalProductionOperationsAttestationEvidenceReview.getReview(),
      divergenceMatrix: FiscalProductionOperationsAttestationDivergenceMatrix.getMatrix(),
      noRealStakeholderNotificationEvidence: FiscalProductionOperationsNoRealStakeholderNotificationEvidence.getEvidence(),
      noRealSignaturePersistenceEvidence: FiscalProductionOperationsNoRealSignaturePersistenceEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionOperationsStakeholderSignatureDependencyMatrix.getMatrix(),
      blockers: FiscalProductionOperationsStakeholderSignatureBlockerRegister.getBlockers(),
      risks: FiscalProductionOperationsStakeholderSignatureRiskRegister.getRisks(),
      status: 'evaluated_safe'
    };
  }
}

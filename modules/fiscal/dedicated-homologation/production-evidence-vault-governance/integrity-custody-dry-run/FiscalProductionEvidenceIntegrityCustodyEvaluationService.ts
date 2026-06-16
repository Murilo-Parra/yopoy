import { FiscalProductionEvidenceIntegrityCustodyInput } from './FiscalProductionEvidenceIntegrityCustodyTypes';
import { FiscalProductionEvidenceIntegrityCustodyPolicy } from './FiscalProductionEvidenceIntegrityCustodyPolicy';
import { FiscalProductionEvidenceIntegrityCustodyValidator } from './FiscalProductionEvidenceIntegrityCustodyValidator';
import { FiscalProductionEvidenceIntegrityReviewBlueprint } from './FiscalProductionEvidenceIntegrityReviewBlueprint';
import { FiscalProductionEvidenceNonCryptographicFingerprintPlan } from './FiscalProductionEvidenceNonCryptographicFingerprintPlan';
import { FiscalProductionEvidenceChainOfCustodyAttestationNoPersistencePlan } from './FiscalProductionEvidenceChainOfCustodyAttestationNoPersistencePlan';
import { FiscalProductionEvidenceTimelineSimulationMatrix } from './FiscalProductionEvidenceTimelineSimulationMatrix';
import { FiscalProductionEvidenceSourceLineageNoVerifyPlan } from './FiscalProductionEvidenceSourceLineageNoVerifyPlan';
import { FiscalProductionEvidenceTamperCheckNoReadNoCryptoPlan } from './FiscalProductionEvidenceTamperCheckNoReadNoCryptoPlan';
import { FiscalProductionEvidenceCustodyHandoffNoOpMatrix } from './FiscalProductionEvidenceCustodyHandoffNoOpMatrix';
import { FiscalProductionEvidenceCompletenessMetadataMatrix } from './FiscalProductionEvidenceCompletenessMetadataMatrix';
import { FiscalProductionEvidenceNoRealCryptoProofEvidence } from './FiscalProductionEvidenceNoRealCryptoProofEvidence';
import { FiscalProductionEvidenceNoCustodyPersistenceEvidence } from './FiscalProductionEvidenceNoCustodyPersistenceEvidence';
import { FiscalProductionEvidenceIntegrityCustodyDependencyMatrix } from './FiscalProductionEvidenceIntegrityCustodyDependencyMatrix';
import { FiscalProductionEvidenceIntegrityCustodyBlockerRegister } from './FiscalProductionEvidenceIntegrityCustodyBlockerRegister';
import { FiscalProductionEvidenceIntegrityCustodyRiskRegister } from './FiscalProductionEvidenceIntegrityCustodyRiskRegister';

export class FiscalProductionEvidenceIntegrityCustodyEvaluationService {
  public static evaluate(input: FiscalProductionEvidenceIntegrityCustodyInput) {
    FiscalProductionEvidenceIntegrityCustodyValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionEvidenceIntegrityCustodyPolicy.getPolicyMessage(),
      integrityReviewBlueprint: FiscalProductionEvidenceIntegrityReviewBlueprint.getBlueprint(),
      nonCryptographicFingerprintPlan: FiscalProductionEvidenceNonCryptographicFingerprintPlan.getPlan(),
      chainOfCustodyAttestationNoPersistencePlan: FiscalProductionEvidenceChainOfCustodyAttestationNoPersistencePlan.getPlan(),
      timelineSimulationMatrix: FiscalProductionEvidenceTimelineSimulationMatrix.getMatrix(),
      sourceLineageNoVerifyPlan: FiscalProductionEvidenceSourceLineageNoVerifyPlan.getPlan(),
      tamperCheckNoReadNoCryptoPlan: FiscalProductionEvidenceTamperCheckNoReadNoCryptoPlan.getPlan(),
      custodyHandoffNoOpMatrix: FiscalProductionEvidenceCustodyHandoffNoOpMatrix.getMatrix(),
      completenessMetadataMatrix: FiscalProductionEvidenceCompletenessMetadataMatrix.getMatrix(),
      noRealCryptoProofEvidence: FiscalProductionEvidenceNoRealCryptoProofEvidence.getEvidence(),
      noCustodyPersistenceEvidence: FiscalProductionEvidenceNoCustodyPersistenceEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionEvidenceIntegrityCustodyDependencyMatrix.getMatrix(),
      blockers: FiscalProductionEvidenceIntegrityCustodyBlockerRegister.getBlockers(),
      risks: FiscalProductionEvidenceIntegrityCustodyRiskRegister.getRisks(),
    };
  }
}

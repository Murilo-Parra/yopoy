import { FiscalProductionEvidenceIntakeInput } from './FiscalProductionEvidenceIntakeTypes';
import { FiscalProductionEvidenceIntakePolicy } from './FiscalProductionEvidenceIntakePolicy';
import { FiscalProductionEvidenceIntakeValidator } from './FiscalProductionEvidenceIntakeValidator';
import { FiscalProductionEvidenceIntakeBlueprint } from './FiscalProductionEvidenceIntakeBlueprint';
import { FiscalProductionEvidenceMetadataSanitizationPlan } from './FiscalProductionEvidenceMetadataSanitizationPlan';
import { FiscalProductionEvidencePayloadExclusionContract } from './FiscalProductionEvidencePayloadExclusionContract';
import { FiscalProductionEvidenceClassificationDryRunMatrix } from './FiscalProductionEvidenceClassificationDryRunMatrix';
import { FiscalProductionEvidenceSourceAuthenticityNoVerifyPlan } from './FiscalProductionEvidenceSourceAuthenticityNoVerifyPlan';
import { FiscalProductionEvidenceChainOfCustodyNoPersistencePlan } from './FiscalProductionEvidenceChainOfCustodyNoPersistencePlan';
import { FiscalProductionEvidenceDeduplicationNoHashPlan } from './FiscalProductionEvidenceDeduplicationNoHashPlan';
import { FiscalProductionEvidenceRetentionTaggingNoOpPlan } from './FiscalProductionEvidenceRetentionTaggingNoOpPlan';
import { FiscalProductionEvidenceIntakeNoStorageEvidence } from './FiscalProductionEvidenceIntakeNoStorageEvidence';
import { FiscalProductionEvidenceIntakeDependencyMatrix } from './FiscalProductionEvidenceIntakeDependencyMatrix';
import { FiscalProductionEvidenceIntakeBlockerRegister } from './FiscalProductionEvidenceIntakeBlockerRegister';
import { FiscalProductionEvidenceIntakeRiskRegister } from './FiscalProductionEvidenceIntakeRiskRegister';

export class FiscalProductionEvidenceIntakeEvaluationService {
  public static evaluate(input: FiscalProductionEvidenceIntakeInput) {
    FiscalProductionEvidenceIntakeValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionEvidenceIntakePolicy.getPolicyMessage(),
      intakeBlueprint: FiscalProductionEvidenceIntakeBlueprint.getBlueprint(),
      metadataSanitizationPlan: FiscalProductionEvidenceMetadataSanitizationPlan.getPlan(),
      payloadExclusionContract: FiscalProductionEvidencePayloadExclusionContract.getContract(),
      classificationDryRunMatrix: FiscalProductionEvidenceClassificationDryRunMatrix.getMatrix(),
      sourceAuthenticityNoVerifyPlan: FiscalProductionEvidenceSourceAuthenticityNoVerifyPlan.getPlan(),
      chainOfCustodyNoPersistencePlan: FiscalProductionEvidenceChainOfCustodyNoPersistencePlan.getPlan(),
      deduplicationNoHashPlan: FiscalProductionEvidenceDeduplicationNoHashPlan.getPlan(),
      retentionTaggingNoOpPlan: FiscalProductionEvidenceRetentionTaggingNoOpPlan.getPlan(),
      noStorageEvidence: FiscalProductionEvidenceIntakeNoStorageEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionEvidenceIntakeDependencyMatrix.getMatrix(),
      blockers: FiscalProductionEvidenceIntakeBlockerRegister.getBlockers(),
      risks: FiscalProductionEvidenceIntakeRiskRegister.getRisks(),
    };
  }
}

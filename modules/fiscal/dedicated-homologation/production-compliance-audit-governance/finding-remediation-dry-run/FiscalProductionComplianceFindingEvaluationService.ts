import { FiscalProductionComplianceFindingInput } from './FiscalProductionComplianceFindingTypes';
import { FiscalProductionComplianceFindingPolicy } from './FiscalProductionComplianceFindingPolicy';
import { FiscalProductionComplianceFindingValidator } from './FiscalProductionComplianceFindingValidator';
import { FiscalProductionComplianceFindingReviewBlueprint } from './FiscalProductionComplianceFindingReviewBlueprint';
import { FiscalProductionComplianceFindingClassificationMatrix } from './FiscalProductionComplianceFindingClassificationMatrix';
import { FiscalProductionComplianceFindingSeverityImpactMatrix } from './FiscalProductionComplianceFindingSeverityImpactMatrix';
import { FiscalProductionComplianceRemediationActionNoOpPlan } from './FiscalProductionComplianceRemediationActionNoOpPlan';
import { FiscalProductionComplianceOwnerAssignmentNoNotificationMatrix } from './FiscalProductionComplianceOwnerAssignmentNoNotificationMatrix';
import { FiscalProductionComplianceExceptionWaiverNoPersistencePlan } from './FiscalProductionComplianceExceptionWaiverNoPersistencePlan';
import { FiscalProductionComplianceEvidenceToFindingNoReadMatrix } from './FiscalProductionComplianceEvidenceToFindingNoReadMatrix';
import { FiscalProductionComplianceRemediationVerificationNoExecutePlan } from './FiscalProductionComplianceRemediationVerificationNoExecutePlan';
import { FiscalProductionComplianceNoFindingPersistenceEvidence } from './FiscalProductionComplianceNoFindingPersistenceEvidence';
import { FiscalProductionComplianceNoRemediationExecutionEvidence } from './FiscalProductionComplianceNoRemediationExecutionEvidence';
import { FiscalProductionComplianceFindingDependencyMatrix } from './FiscalProductionComplianceFindingDependencyMatrix';
import { FiscalProductionComplianceFindingBlockerRegister } from './FiscalProductionComplianceFindingBlockerRegister';
import { FiscalProductionComplianceFindingRiskRegister } from './FiscalProductionComplianceFindingRiskRegister';

export class FiscalProductionComplianceFindingEvaluationService {
  public static evaluate(input: FiscalProductionComplianceFindingInput) {
    FiscalProductionComplianceFindingValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionComplianceFindingPolicy.getPolicyMessage(),
      findingReviewBlueprint: FiscalProductionComplianceFindingReviewBlueprint.getBlueprint(),
      findingClassificationMatrix: FiscalProductionComplianceFindingClassificationMatrix.getMatrix(),
      severityImpactMatrix: FiscalProductionComplianceFindingSeverityImpactMatrix.getMatrix(),
      remediationActionNoOpPlan: FiscalProductionComplianceRemediationActionNoOpPlan.getPlan(),
      ownerAssignmentNoNotificationMatrix: FiscalProductionComplianceOwnerAssignmentNoNotificationMatrix.getMatrix(),
      exceptionWaiverNoPersistencePlan: FiscalProductionComplianceExceptionWaiverNoPersistencePlan.getPlan(),
      evidenceToFindingNoReadMatrix: FiscalProductionComplianceEvidenceToFindingNoReadMatrix.getMatrix(),
      remediationVerificationNoExecutePlan: FiscalProductionComplianceRemediationVerificationNoExecutePlan.getPlan(),
      noFindingPersistenceEvidence: FiscalProductionComplianceNoFindingPersistenceEvidence.getEvidence(),
      noRemediationExecutionEvidence: FiscalProductionComplianceNoRemediationExecutionEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionComplianceFindingDependencyMatrix.getMatrix(),
      blockers: FiscalProductionComplianceFindingBlockerRegister.getBlockers(),
      risks: FiscalProductionComplianceFindingRiskRegister.getRisks(),
    };
  }
}

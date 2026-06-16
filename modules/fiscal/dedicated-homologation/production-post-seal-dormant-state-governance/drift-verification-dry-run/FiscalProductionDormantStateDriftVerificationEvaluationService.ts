import { FiscalProductionDormantStateDriftVerificationInput, FiscalProductionDormantStateDriftVerificationStatus } from './FiscalProductionDormantStateDriftVerificationTypes';
import { FiscalProductionDormantStateDriftVerificationValidator } from './FiscalProductionDormantStateDriftVerificationValidator';
import { FiscalProductionDormantStateDriftVerificationBlueprint } from './FiscalProductionDormantStateDriftVerificationBlueprint';
import { FiscalProductionNoResumeEvidenceBlueprint } from './FiscalProductionNoResumeEvidenceBlueprint';
import { FiscalProductionReentryInvariantAuditMatrix } from './FiscalProductionReentryInvariantAuditMatrix';
import { FiscalProductionAuthorityDriftNoDetectRealMatrix } from './FiscalProductionAuthorityDriftNoDetectRealMatrix';
import { FiscalProductionActivationDriftNoDetectRealMatrix } from './FiscalProductionActivationDriftNoDetectRealMatrix';
import { FiscalProductionRoutingDriftNoDetectRealMatrix } from './FiscalProductionRoutingDriftNoDetectRealMatrix';
import { FiscalProductionRuntimeDriftNoDetectRealPlan } from './FiscalProductionRuntimeDriftNoDetectRealPlan';
import { FiscalProductionDatabaseDriftNoDetectRealMatrix } from './FiscalProductionDatabaseDriftNoDetectRealMatrix';
import { FiscalProductionExternalIntegrationDriftNoDetectRealPlan } from './FiscalProductionExternalIntegrationDriftNoDetectRealPlan';
import { FiscalProductionSensitiveDataDriftNoDetectRealMatrix } from './FiscalProductionSensitiveDataDriftNoDetectRealMatrix';
import { FiscalProductionFlagInvariantVerificationMatrix } from './FiscalProductionFlagInvariantVerificationMatrix';
import { FiscalProductionPolicyInvariantVerificationMatrix } from './FiscalProductionPolicyInvariantVerificationMatrix';
import { FiscalProductionDependencyInvariantVerificationMatrix } from './FiscalProductionDependencyInvariantVerificationMatrix';
import { FiscalProductionNoRealDormantStateDriftEvidence } from './FiscalProductionNoRealDormantStateDriftEvidence';
import { FiscalProductionNoRealResumeEvidence } from './FiscalProductionNoRealResumeEvidence';
import { FiscalProductionNoRealReentryInvariantBreakEvidence } from './FiscalProductionNoRealReentryInvariantBreakEvidence';
import { FiscalProductionDormantStateDriftVerificationDependencyMatrix } from './FiscalProductionDormantStateDriftVerificationDependencyMatrix';
import { FiscalProductionDormantStateDriftVerificationBlockerRegister } from './FiscalProductionDormantStateDriftVerificationBlockerRegister';
import { FiscalProductionDormantStateDriftVerificationRiskRegister } from './FiscalProductionDormantStateDriftVerificationRiskRegister';

export class FiscalProductionDormantStateDriftVerificationEvaluationService {
  public static evaluate(input: FiscalProductionDormantStateDriftVerificationInput): any {
    const blockers = FiscalProductionDormantStateDriftVerificationValidator.validate(input);

    if (blockers.length > 0) {
      return {
        status: FiscalProductionDormantStateDriftVerificationStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionDormantStateDriftVerificationStatus.PRODUCTION_DORMANT_STATE_DRIFT_VERIFICATION_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      driftVerificationBlueprint: FiscalProductionDormantStateDriftVerificationBlueprint.getBlueprint(),
      noResumeEvidenceBlueprint: FiscalProductionNoResumeEvidenceBlueprint.getBlueprint(),
      reentryInvariantAuditMatrix: FiscalProductionReentryInvariantAuditMatrix.getMatrix(),
      authorityDriftMatrix: FiscalProductionAuthorityDriftNoDetectRealMatrix.getMatrix(),
      activationDriftMatrix: FiscalProductionActivationDriftNoDetectRealMatrix.getMatrix(),
      routingDriftMatrix: FiscalProductionRoutingDriftNoDetectRealMatrix.getMatrix(),
      runtimeDriftPlan: FiscalProductionRuntimeDriftNoDetectRealPlan.getPlan(),
      databaseDriftMatrix: FiscalProductionDatabaseDriftNoDetectRealMatrix.getMatrix(),
      externalIntegrationDriftPlan: FiscalProductionExternalIntegrationDriftNoDetectRealPlan.getPlan(),
      sensitiveDataDriftMatrix: FiscalProductionSensitiveDataDriftNoDetectRealMatrix.getMatrix(),
      flagInvariantVerificationMatrix: FiscalProductionFlagInvariantVerificationMatrix.getMatrix(),
      policyInvariantVerificationMatrix: FiscalProductionPolicyInvariantVerificationMatrix.getMatrix(),
      dependencyInvariantVerificationMatrix: FiscalProductionDependencyInvariantVerificationMatrix.getMatrix(),
      noRealDormantStateDriftEvidence: FiscalProductionNoRealDormantStateDriftEvidence.getEvidence(),
      noRealResumeEvidence: FiscalProductionNoRealResumeEvidence.getEvidence(),
      noRealReentryInvariantBreakEvidence: FiscalProductionNoRealReentryInvariantBreakEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionDormantStateDriftVerificationDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionDormantStateDriftVerificationBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionDormantStateDriftVerificationRiskRegister.getRisks()
    };
  }
}

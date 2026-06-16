import { FiscalProductionPostSealDormantStateInput, FiscalProductionPostSealDormantStateResult, FiscalProductionPostSealDormantStateStatus } from './FiscalProductionPostSealDormantStateTypes';
import { FiscalProductionPostSealDormantStateValidator } from './FiscalProductionPostSealDormantStateValidator';
import { FiscalProductionPostSealDormantStateGovernanceBlueprint } from './FiscalProductionPostSealDormantStateGovernanceBlueprint';
import { FiscalProductionPermanentNonResumptionContract } from './FiscalProductionPermanentNonResumptionContract';
import { FiscalProductionNoReentryBoundaryMatrix } from './FiscalProductionNoReentryBoundaryMatrix';
import { FiscalProductionAuthorityResumptionBlockedPlan } from './FiscalProductionAuthorityResumptionBlockedPlan';
import { FiscalProductionActivationResumptionBlockedPlan } from './FiscalProductionActivationResumptionBlockedPlan';
import { FiscalProductionRoutingResumptionBlockedMatrix } from './FiscalProductionRoutingResumptionBlockedMatrix';
import { FiscalProductionRuntimeResumptionBlockedPlan } from './FiscalProductionRuntimeResumptionBlockedPlan';
import { FiscalProductionDatabaseResumptionBlockedMatrix } from './FiscalProductionDatabaseResumptionBlockedMatrix';
import { FiscalProductionExternalIntegrationResumptionBlockedPlan } from './FiscalProductionExternalIntegrationResumptionBlockedPlan';
import { FiscalProductionSensitiveDataResumptionBlockedMatrix } from './FiscalProductionSensitiveDataResumptionBlockedMatrix';
import { FiscalProductionDormantStateNoRecordPlan } from './FiscalProductionDormantStateNoRecordPlan';
import { FiscalProductionNoRealDormancyRecordEvidence } from './FiscalProductionNoRealDormancyRecordEvidence';
import { FiscalProductionNoRealResumptionEvidence } from './FiscalProductionNoRealResumptionEvidence';
import { FiscalProductionNoRealReentryEvidence } from './FiscalProductionNoRealReentryEvidence';
import { FiscalProductionPostSealDormantStateDependencyMatrix } from './FiscalProductionPostSealDormantStateDependencyMatrix';
import { FiscalProductionPostSealDormantStateBlockerRegister } from './FiscalProductionPostSealDormantStateBlockerRegister';
import { FiscalProductionPostSealDormantStateRiskRegister } from './FiscalProductionPostSealDormantStateRiskRegister';

export class FiscalProductionPostSealDormantStateEvaluationService {
  public static evaluate(input: FiscalProductionPostSealDormantStateInput): any {
    const blockers = FiscalProductionPostSealDormantStateValidator.validate(input);
    
    if (blockers.length > 0) {
      return {
        status: FiscalProductionPostSealDormantStateStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionPostSealDormantStateStatus.PRODUCTION_POST_SEAL_DORMANT_STATE_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      dormantStateBlueprint: FiscalProductionPostSealDormantStateGovernanceBlueprint.getBlueprint(),
      permanentNonResumptionContract: FiscalProductionPermanentNonResumptionContract.getContract(),
      noReentryBoundaryMatrix: FiscalProductionNoReentryBoundaryMatrix.getMatrix(),
      authorityResumptionBlockedPlan: FiscalProductionAuthorityResumptionBlockedPlan.getPlan(),
      activationResumptionBlockedPlan: FiscalProductionActivationResumptionBlockedPlan.getPlan(),
      routingResumptionBlockedMatrix: FiscalProductionRoutingResumptionBlockedMatrix.getMatrix(),
      runtimeResumptionBlockedPlan: FiscalProductionRuntimeResumptionBlockedPlan.getPlan(),
      databaseResumptionBlockedMatrix: FiscalProductionDatabaseResumptionBlockedMatrix.getMatrix(),
      externalIntegrationResumptionBlockedPlan: FiscalProductionExternalIntegrationResumptionBlockedPlan.getPlan(),
      sensitiveDataResumptionBlockedMatrix: FiscalProductionSensitiveDataResumptionBlockedMatrix.getMatrix(),
      dormantStateNoRecordPlan: FiscalProductionDormantStateNoRecordPlan.getPlan(),
      noRealDormancyRecordEvidence: FiscalProductionNoRealDormancyRecordEvidence.getEvidence(),
      noRealResumptionEvidence: FiscalProductionNoRealResumptionEvidence.getEvidence(),
      noRealReentryEvidence: FiscalProductionNoRealReentryEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionPostSealDormantStateDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionPostSealDormantStateBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionPostSealDormantStateRiskRegister.getRisks()
    };
  }
}

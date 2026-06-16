import { FiscalProductionReentryAttemptDenialInput, FiscalProductionReentryAttemptDenialResult, FiscalProductionReentryAttemptDenialStatus } from './FiscalProductionReentryAttemptDenialTypes';
import { FiscalProductionReentryAttemptDenialValidator } from './FiscalProductionReentryAttemptDenialValidator';
import { FiscalProductionReentryAttemptDenialBlueprint } from './FiscalProductionReentryAttemptDenialBlueprint';
import { FiscalProductionResumptionLockContract } from './FiscalProductionResumptionLockContract';
import { FiscalProductionDormantStateContinuityMatrix } from './FiscalProductionDormantStateContinuityMatrix';
import { FiscalProductionAuthorityReentryDenialMatrix } from './FiscalProductionAuthorityReentryDenialMatrix';
import { FiscalProductionActivationReentryDenialMatrix } from './FiscalProductionActivationReentryDenialMatrix';
import { FiscalProductionRoutingReentryDenialMatrix } from './FiscalProductionRoutingReentryDenialMatrix';
import { FiscalProductionRuntimeReentryDenialPlan } from './FiscalProductionRuntimeReentryDenialPlan';
import { FiscalProductionDatabaseReentryDenialMatrix } from './FiscalProductionDatabaseReentryDenialMatrix';
import { FiscalProductionExternalIntegrationReentryDenialPlan } from './FiscalProductionExternalIntegrationReentryDenialPlan';
import { FiscalProductionSensitiveDataReentryDenialMatrix } from './FiscalProductionSensitiveDataReentryDenialMatrix';
import { FiscalProductionGateUnlockReentryDenialPlan } from './FiscalProductionGateUnlockReentryDenialPlan';
import { FiscalProductionAuthorizationTokenReentryDenialMatrix } from './FiscalProductionAuthorizationTokenReentryDenialMatrix';
import { FiscalProductionProductionV2ReentryBlockedEvidence } from './FiscalProductionProductionV2ReentryBlockedEvidence';
import { FiscalProductionNoRealReentryAttemptEvidence } from './FiscalProductionNoRealReentryAttemptEvidence';
import { FiscalProductionNoRealResumptionUnlockEvidence } from './FiscalProductionNoRealResumptionUnlockEvidence';
import { FiscalProductionNoRealReactivationEvidence } from './FiscalProductionNoRealReactivationEvidence';
import { FiscalProductionReentryAttemptDenialDependencyMatrix } from './FiscalProductionReentryAttemptDenialDependencyMatrix';
import { FiscalProductionReentryAttemptDenialBlockerRegister } from './FiscalProductionReentryAttemptDenialBlockerRegister';
import { FiscalProductionReentryAttemptDenialRiskRegister } from './FiscalProductionReentryAttemptDenialRiskRegister';

export class FiscalProductionReentryAttemptDenialEvaluationService {
  public static evaluate(input: FiscalProductionReentryAttemptDenialInput): any {
    const blockers = FiscalProductionReentryAttemptDenialValidator.validate(input);

    if (blockers.length > 0) {
      return {
        status: FiscalProductionReentryAttemptDenialStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionReentryAttemptDenialStatus.PRODUCTION_REENTRY_ATTEMPT_DENIAL_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      reentryAttemptDenialBlueprint: FiscalProductionReentryAttemptDenialBlueprint.getBlueprint(),
      resumptionLockContract: FiscalProductionResumptionLockContract.getContract(),
      dormantStateContinuityMatrix: FiscalProductionDormantStateContinuityMatrix.getMatrix(),
      authorityReentryDenialMatrix: FiscalProductionAuthorityReentryDenialMatrix.getMatrix(),
      activationReentryDenialMatrix: FiscalProductionActivationReentryDenialMatrix.getMatrix(),
      routingReentryDenialMatrix: FiscalProductionRoutingReentryDenialMatrix.getMatrix(),
      runtimeReentryDenialPlan: FiscalProductionRuntimeReentryDenialPlan.getPlan(),
      databaseReentryDenialMatrix: FiscalProductionDatabaseReentryDenialMatrix.getMatrix(),
      externalIntegrationReentryDenialPlan: FiscalProductionExternalIntegrationReentryDenialPlan.getPlan(),
      sensitiveDataReentryDenialMatrix: FiscalProductionSensitiveDataReentryDenialMatrix.getMatrix(),
      gateUnlockReentryDenialPlan: FiscalProductionGateUnlockReentryDenialPlan.getPlan(),
      authorizationTokenReentryDenialMatrix: FiscalProductionAuthorizationTokenReentryDenialMatrix.getMatrix(),
      productionV2ReentryBlockedEvidence: FiscalProductionProductionV2ReentryBlockedEvidence.getEvidence(),
      noRealReentryAttemptEvidence: FiscalProductionNoRealReentryAttemptEvidence.getEvidence(),
      noRealResumptionUnlockEvidence: FiscalProductionNoRealResumptionUnlockEvidence.getEvidence(),
      noRealReactivationEvidence: FiscalProductionNoRealReactivationEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionReentryAttemptDenialDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionReentryAttemptDenialBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionReentryAttemptDenialRiskRegister.getRisks()
    };
  }
}

import { FiscalProductionDormantStateFinalReviewInput, FiscalProductionDormantStateFinalReviewStatus } from './FiscalProductionDormantStateFinalReviewTypes';
import { FiscalProductionDormantStateFinalReviewValidator } from './FiscalProductionDormantStateFinalReviewValidator';
import { FiscalProductionDormantStateFinalReviewBlueprint } from './FiscalProductionDormantStateFinalReviewBlueprint';
import { FiscalProductionExecutiveNonResumptionAcknowledgementMatrix } from './FiscalProductionExecutiveNonResumptionAcknowledgementMatrix';
import { FiscalProductionNoLegalEffectReviewNotice } from './FiscalProductionNoLegalEffectReviewNotice';
import { FiscalProductionDormantStateFinalContinuityMatrix } from './FiscalProductionDormantStateFinalContinuityMatrix';
import { FiscalProductionExecutiveReviewNoApprovalMatrix } from './FiscalProductionExecutiveReviewNoApprovalMatrix';
import { FiscalProductionAcknowledgementNoBindingPlan } from './FiscalProductionAcknowledgementNoBindingPlan';
import { FiscalProductionDormantStateMinutesNoFilePlan } from './FiscalProductionDormantStateMinutesNoFilePlan';
import { FiscalProductionFinalReviewNoSignaturePlan } from './FiscalProductionFinalReviewNoSignaturePlan';
import { FiscalProductionFinalReviewNoNotificationPlan } from './FiscalProductionFinalReviewNoNotificationPlan';
import { FiscalProductionFinalReviewNoExportPlan } from './FiscalProductionFinalReviewNoExportPlan';
import { FiscalProductionFinalReviewNoHandoffPlan } from './FiscalProductionFinalReviewNoHandoffPlan';
import { FiscalProductionFinalReviewNoRealApprovalEvidence } from './FiscalProductionFinalReviewNoRealApprovalEvidence';
import { FiscalProductionFinalReviewNoRealAcknowledgementEvidence } from './FiscalProductionFinalReviewNoRealAcknowledgementEvidence';
import { FiscalProductionNoRealLegalEffectEvidence } from './FiscalProductionNoRealLegalEffectEvidence';
import { FiscalProductionNoRealFinalReviewHandoffEvidence } from './FiscalProductionNoRealFinalReviewHandoffEvidence';
import { FiscalProductionDormantStateFinalReviewDependencyMatrix } from './FiscalProductionDormantStateFinalReviewDependencyMatrix';
import { FiscalProductionDormantStateFinalReviewBlockerRegister } from './FiscalProductionDormantStateFinalReviewBlockerRegister';
import { FiscalProductionDormantStateFinalReviewRiskRegister } from './FiscalProductionDormantStateFinalReviewRiskRegister';

export class FiscalProductionDormantStateFinalReviewEvaluationService {
  public static evaluate(input: FiscalProductionDormantStateFinalReviewInput): any {
    const blockers = FiscalProductionDormantStateFinalReviewValidator.validate(input);

    if (blockers.length > 0) {
      return {
        status: FiscalProductionDormantStateFinalReviewStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionDormantStateFinalReviewStatus.PRODUCTION_DORMANT_STATE_FINAL_REVIEW_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      finalReviewBlueprint: FiscalProductionDormantStateFinalReviewBlueprint.getBlueprint(),
      executiveNonResumptionAcknowledgementMatrix: FiscalProductionExecutiveNonResumptionAcknowledgementMatrix.getMatrix(),
      noLegalEffectReviewNotice: FiscalProductionNoLegalEffectReviewNotice.getNotice(),
      dormantStateFinalContinuityMatrix: FiscalProductionDormantStateFinalContinuityMatrix.getMatrix(),
      executiveReviewNoApprovalMatrix: FiscalProductionExecutiveReviewNoApprovalMatrix.getMatrix(),
      acknowledgementNoBindingPlan: FiscalProductionAcknowledgementNoBindingPlan.getPlan(),
      minutesNoFilePlan: FiscalProductionDormantStateMinutesNoFilePlan.getPlan(),
      finalReviewNoSignaturePlan: FiscalProductionFinalReviewNoSignaturePlan.getPlan(),
      finalReviewNoNotificationPlan: FiscalProductionFinalReviewNoNotificationPlan.getPlan(),
      finalReviewNoExportPlan: FiscalProductionFinalReviewNoExportPlan.getPlan(),
      finalReviewNoHandoffPlan: FiscalProductionFinalReviewNoHandoffPlan.getPlan(),
      noRealExecutiveApprovalEvidence: FiscalProductionFinalReviewNoRealApprovalEvidence.getEvidence(),
      noRealAcknowledgementEvidence: FiscalProductionFinalReviewNoRealAcknowledgementEvidence.getEvidence(),
      noRealLegalEffectEvidence: FiscalProductionNoRealLegalEffectEvidence.getEvidence(),
      noRealFinalReviewHandoffEvidence: FiscalProductionNoRealFinalReviewHandoffEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionDormantStateFinalReviewDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionDormantStateFinalReviewBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionDormantStateFinalReviewRiskRegister.getRisks()
    };
  }
}

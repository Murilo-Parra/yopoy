import { FiscalProductionFinalAuthorizationInput, FiscalProductionFinalAuthorizationResult } from './FiscalProductionFinalAuthorizationTypes';
import { FiscalProductionFinalAuthorizationPolicy } from './FiscalProductionFinalAuthorizationPolicy';
import { FiscalProductionFinalAuthorizationPackage } from './FiscalProductionFinalAuthorizationPackage';
import { FiscalProductionNonExecutableAuthorizationEnvelope } from './FiscalProductionNonExecutableAuthorizationEnvelope';
import { FiscalProductionLockedGateReadinessReview } from './FiscalProductionLockedGateReadinessReview';
import { FiscalProductionGateUnlockNoOpEvidence } from './FiscalProductionGateUnlockNoOpEvidence';
import { FiscalProductionAuthorizationSoDFinalCheck } from './FiscalProductionAuthorizationSoDFinalCheck';
import { FiscalProductionAuthorizationDecisionPackage } from './FiscalProductionAuthorizationDecisionPackage';
import { FiscalProductionLockedGateHandoffService } from './FiscalProductionLockedGateHandoffService';
import { FiscalProductionFinalAuthorizationDependencyMatrix } from './FiscalProductionFinalAuthorizationDependencyMatrix';
import { FiscalProductionFinalAuthorizationBlockerRegister } from './FiscalProductionFinalAuthorizationBlockerRegister';
import { FiscalProductionFinalAuthorizationRiskRegister } from './FiscalProductionFinalAuthorizationRiskRegister';

export class FiscalProductionFinalAuthorizationEvaluationService {
  public static evaluate(input: FiscalProductionFinalAuthorizationInput): FiscalProductionFinalAuthorizationResult {
    const policyResult = FiscalProductionFinalAuthorizationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionFinalAuthorizationResult;
    }

    FiscalProductionFinalAuthorizationPackage.generatePackage();
    FiscalProductionNonExecutableAuthorizationEnvelope.generateEnvelope();
    FiscalProductionLockedGateReadinessReview.generateReview();
    FiscalProductionGateUnlockNoOpEvidence.generateEvidence();
    FiscalProductionAuthorizationSoDFinalCheck.generateCheck();
    FiscalProductionAuthorizationDecisionPackage.generatePackage();
    FiscalProductionLockedGateHandoffService.generateHandoff();
    FiscalProductionFinalAuthorizationDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionFinalAuthorizationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionFinalAuthorizationBlockerRegister.getBlockers(),
      warnings: FiscalProductionFinalAuthorizationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

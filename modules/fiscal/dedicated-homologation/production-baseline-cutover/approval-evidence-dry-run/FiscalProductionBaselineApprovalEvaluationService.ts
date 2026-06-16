import { FiscalProductionBaselineApprovalInput, FiscalProductionBaselineApprovalResult } from './FiscalProductionBaselineApprovalTypes';
import { FiscalProductionBaselineApprovalPolicy } from './FiscalProductionBaselineApprovalPolicy';
import { FiscalProductionBaselineCutoverApprovalPackage } from './FiscalProductionBaselineCutoverApprovalPackage';
import { FiscalProductionBaselineEvidenceGovernancePlan } from './FiscalProductionBaselineEvidenceGovernancePlan';
import { FiscalProductionBaselineApprovalMatrix } from './FiscalProductionBaselineApprovalMatrix';
import { FiscalProductionBaselinePreconditionEvidenceReview } from './FiscalProductionBaselinePreconditionEvidenceReview';
import { FiscalProductionHardLockEvidenceReview } from './FiscalProductionHardLockEvidenceReview';
import { FiscalProductionLegacyContinuityEvidenceReview } from './FiscalProductionLegacyContinuityEvidenceReview';
import { FiscalProductionV2LockedEvidenceReview } from './FiscalProductionV2LockedEvidenceReview';
import { FiscalProductionTrafficLockEvidenceReview } from './FiscalProductionTrafficLockEvidenceReview';
import { FiscalProductionRuntimeLockEvidenceReview } from './FiscalProductionRuntimeLockEvidenceReview';
import { FiscalProductionDataBoundaryEvidenceReview } from './FiscalProductionDataBoundaryEvidenceReview';
import { FiscalProductionExternalIntegrationEvidenceReview } from './FiscalProductionExternalIntegrationEvidenceReview';
import { FiscalProductionBaselineApprovalDependencyMatrix } from './FiscalProductionBaselineApprovalDependencyMatrix';
import { FiscalProductionBaselineApprovalBlockerRegister } from './FiscalProductionBaselineApprovalBlockerRegister';
import { FiscalProductionBaselineApprovalRiskRegister } from './FiscalProductionBaselineApprovalRiskRegister';

export class FiscalProductionBaselineApprovalEvaluationService {
  public static evaluate(input: FiscalProductionBaselineApprovalInput): FiscalProductionBaselineApprovalResult {
    const policyResult = FiscalProductionBaselineApprovalPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionBaselineApprovalResult;
    }

    FiscalProductionBaselineCutoverApprovalPackage.getPackage();
    FiscalProductionBaselineEvidenceGovernancePlan.getPlan();
    FiscalProductionBaselineApprovalMatrix.getMatrix();
    FiscalProductionBaselinePreconditionEvidenceReview.getReview();
    FiscalProductionHardLockEvidenceReview.getReview();
    FiscalProductionLegacyContinuityEvidenceReview.getReview();
    FiscalProductionV2LockedEvidenceReview.getReview();
    FiscalProductionTrafficLockEvidenceReview.getReview();
    FiscalProductionRuntimeLockEvidenceReview.getReview();
    FiscalProductionDataBoundaryEvidenceReview.getReview();
    FiscalProductionExternalIntegrationEvidenceReview.getReview();
    FiscalProductionBaselineApprovalDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionBaselineApprovalPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionBaselineApprovalBlockerRegister.getBlockers(),
      warnings: FiscalProductionBaselineApprovalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

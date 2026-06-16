import { FiscalRealApprovalDualClosureInput, FiscalRealApprovalDualClosureResult } from './FiscalRealApprovalDualClosureTypes';
import { FiscalRealApprovalDualClosurePolicy } from './FiscalRealApprovalDualClosurePolicy';
import { FiscalRealApprovalDualClosureBlockerRegister } from './FiscalRealApprovalDualClosureBlockerRegister';
import { FiscalRealApprovalDualClosureRiskRegister } from './FiscalRealApprovalDualClosureRiskRegister';
import { FiscalRealApprovalDualConclusionSimulator } from './FiscalRealApprovalDualConclusionSimulator';
import { FiscalRealApprovalDualSoDReview } from './FiscalRealApprovalDualSoDReview';
import { FiscalRealApprovalGovernanceClosureInventory } from './FiscalRealApprovalGovernanceClosureInventory';
import { FiscalRealApprovalGovernanceFinalChecklist } from './FiscalRealApprovalGovernanceFinalChecklist';
import { FiscalRealApprovalGovernanceEvidencePackageService } from './FiscalRealApprovalGovernanceEvidencePackageService';

export class FiscalRealApprovalDualClosureEvaluationService {
  public static evaluate(input: FiscalRealApprovalDualClosureInput): FiscalRealApprovalDualClosureResult {
    const policyResult = FiscalRealApprovalDualClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRealApprovalDualClosureResult;
    }

    const sim = FiscalRealApprovalDualConclusionSimulator.simulateConclusion(input);
    const sod = FiscalRealApprovalDualSoDReview.review(input);
    const inv = FiscalRealApprovalGovernanceClosureInventory.generateInventory();
    const chk = FiscalRealApprovalGovernanceFinalChecklist.generateChecklist();
    const evp = FiscalRealApprovalGovernanceEvidencePackageService.generatePackage();

    const baseResult = FiscalRealApprovalDualClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRealApprovalDualClosureBlockerRegister.getBlockers(),
      warnings: FiscalRealApprovalDualClosureRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

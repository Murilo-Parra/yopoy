import { FiscalLegalAuditClosureInput, FiscalLegalAuditClosureResult } from './FiscalLegalAuditClosureTypes';
import { FiscalLegalAuditClosurePolicy } from './FiscalLegalAuditClosurePolicy';
import { FiscalLegalAuditFinalBlockerRegister } from './FiscalLegalAuditFinalBlockerRegister';
import { FiscalLegalAuditFinalRiskRegister } from './FiscalLegalAuditFinalRiskRegister';
import { FiscalLegalAuditClosureInventory } from './FiscalLegalAuditClosureInventory';
import { FiscalLegalAuditFinalChecklist } from './FiscalLegalAuditFinalChecklist';
import { FiscalLegalAuditClosureEvidencePackageService } from './FiscalLegalAuditClosureEvidencePackageService';
import { FiscalLegalAuditAuditorHandoffService } from './FiscalLegalAuditAuditorHandoffService';
import { FiscalLegalAuditRetentionHandoffPlan } from './FiscalLegalAuditRetentionHandoffPlan';

export class FiscalLegalAuditClosureEvaluationService {
  public static evaluate(input: FiscalLegalAuditClosureInput): FiscalLegalAuditClosureResult {
    const policyResult = FiscalLegalAuditClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalAuditClosureResult;
    }

    // Call services to verify correctness conceptually
    FiscalLegalAuditClosureInventory.generateInventory();
    FiscalLegalAuditFinalChecklist.generateChecklist();
    FiscalLegalAuditClosureEvidencePackageService.generatePackage();
    FiscalLegalAuditAuditorHandoffService.generateHandoff();
    FiscalLegalAuditRetentionHandoffPlan.generatePlan();

    const baseResult = FiscalLegalAuditClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalAuditFinalBlockerRegister.getBlockers(),
      warnings: FiscalLegalAuditFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

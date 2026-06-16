import { FiscalProductionBaselineCutoverClosureInput, FiscalProductionBaselineCutoverClosureResult } from './FiscalProductionBaselineCutoverClosureTypes';
import { FiscalProductionBaselineCutoverClosurePolicy } from './FiscalProductionBaselineCutoverClosurePolicy';
import { FiscalProductionBaselineCutoverClosureInventory } from './FiscalProductionBaselineCutoverClosureInventory';
import { FiscalProductionBaselineCutoverFinalChecklist } from './FiscalProductionBaselineCutoverFinalChecklist';
import { FiscalProductionBaselineCutoverEvidencePackageService } from './FiscalProductionBaselineCutoverEvidencePackageService';
import { FiscalProductionBaselineNoActivationHandoffService } from './FiscalProductionBaselineNoActivationHandoffService';
import { FiscalProductionBaselinePostClosureRoadmap } from './FiscalProductionBaselinePostClosureRoadmap';
import { FiscalProductionBaselineCutoverFinalBlockerRegister } from './FiscalProductionBaselineCutoverFinalBlockerRegister';
import { FiscalProductionBaselineCutoverFinalRiskRegister } from './FiscalProductionBaselineCutoverFinalRiskRegister';

export class FiscalProductionBaselineCutoverClosureEvaluationService {
  public static evaluate(input: FiscalProductionBaselineCutoverClosureInput): FiscalProductionBaselineCutoverClosureResult {
    const policyResult = FiscalProductionBaselineCutoverClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionBaselineCutoverClosureResult;
    }

    FiscalProductionBaselineCutoverClosureInventory.getInventory();
    FiscalProductionBaselineCutoverFinalChecklist.getChecklist();
    FiscalProductionBaselineCutoverEvidencePackageService.getPackage();
    FiscalProductionBaselineNoActivationHandoffService.getHandoff();
    FiscalProductionBaselinePostClosureRoadmap.getRoadmap();

    const baseResult = FiscalProductionBaselineCutoverClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionBaselineCutoverFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionBaselineCutoverFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

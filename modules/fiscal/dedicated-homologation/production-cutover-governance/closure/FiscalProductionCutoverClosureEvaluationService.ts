import { FiscalProductionCutoverClosureInput, FiscalProductionCutoverClosureResult } from './FiscalProductionCutoverClosureTypes';
import { FiscalProductionCutoverClosurePolicy } from './FiscalProductionCutoverClosurePolicy';
import { FiscalProductionCutoverClosureInventory } from './FiscalProductionCutoverClosureInventory';
import { FiscalProductionCutoverFinalChecklist } from './FiscalProductionCutoverFinalChecklist';
import { FiscalProductionCutoverEvidencePackageService } from './FiscalProductionCutoverEvidencePackageService';
import { FiscalProductionNoActivationHandoffService } from './FiscalProductionNoActivationHandoffService';
import { FiscalProductionCutoverPostClosureRoadmap } from './FiscalProductionCutoverPostClosureRoadmap';
import { FiscalProductionCutoverFinalBlockerRegister } from './FiscalProductionCutoverFinalBlockerRegister';
import { FiscalProductionCutoverFinalRiskRegister } from './FiscalProductionCutoverFinalRiskRegister';

export class FiscalProductionCutoverClosureEvaluationService {
  public static evaluate(input: FiscalProductionCutoverClosureInput): FiscalProductionCutoverClosureResult {
    const policyResult = FiscalProductionCutoverClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionCutoverClosureResult;
    }

    FiscalProductionCutoverClosureInventory.getInventory();
    FiscalProductionCutoverFinalChecklist.getChecklist();
    FiscalProductionCutoverEvidencePackageService.getEvidencePackage();
    FiscalProductionNoActivationHandoffService.getHandoff();
    FiscalProductionCutoverPostClosureRoadmap.getRoadmap();

    const baseResult = FiscalProductionCutoverClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionCutoverFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionCutoverFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

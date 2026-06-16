import { FiscalProductionRuntimeExecutionClosureInput, FiscalProductionRuntimeExecutionClosureResult } from './FiscalProductionRuntimeExecutionClosureTypes';
import { FiscalProductionRuntimeExecutionClosurePolicy } from './FiscalProductionRuntimeExecutionClosurePolicy';
import { FiscalProductionRuntimeExecutionClosureInventory } from './FiscalProductionRuntimeExecutionClosureInventory';
import { FiscalProductionRuntimeExecutionFinalChecklist } from './FiscalProductionRuntimeExecutionFinalChecklist';
import { FiscalProductionRuntimeExecutionEvidencePackageService } from './FiscalProductionRuntimeExecutionEvidencePackageService';
import { FiscalProductionRuntimeNoExecutionHandoffService } from './FiscalProductionRuntimeNoExecutionHandoffService';
import { FiscalProductionRuntimePostClosureRoadmap } from './FiscalProductionRuntimePostClosureRoadmap';
import { FiscalProductionRuntimeExecutionFinalBlockerRegister } from './FiscalProductionRuntimeExecutionFinalBlockerRegister';
import { FiscalProductionRuntimeExecutionFinalRiskRegister } from './FiscalProductionRuntimeExecutionFinalRiskRegister';

export class FiscalProductionRuntimeExecutionClosureEvaluationService {
  public static evaluate(input: FiscalProductionRuntimeExecutionClosureInput): FiscalProductionRuntimeExecutionClosureResult {
    const policyResult = FiscalProductionRuntimeExecutionClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRuntimeExecutionClosureResult;
    }

    FiscalProductionRuntimeExecutionClosureInventory.getInventory();
    FiscalProductionRuntimeExecutionFinalChecklist.getChecklist();
    FiscalProductionRuntimeExecutionEvidencePackageService.generatePackage();
    FiscalProductionRuntimeNoExecutionHandoffService.generateHandoff();
    FiscalProductionRuntimePostClosureRoadmap.getRoadmap();

    const baseResult = FiscalProductionRuntimeExecutionClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRuntimeExecutionFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionRuntimeExecutionFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

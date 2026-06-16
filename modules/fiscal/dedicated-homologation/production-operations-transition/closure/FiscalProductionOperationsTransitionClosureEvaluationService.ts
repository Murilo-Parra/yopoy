import { FiscalProductionOperationsTransitionClosureInput, FiscalProductionOperationsTransitionClosureResult } from './FiscalProductionOperationsTransitionClosureTypes';
import { FiscalProductionOperationsTransitionClosurePolicy } from './FiscalProductionOperationsTransitionClosurePolicy';
import { FiscalProductionOperationsTransitionClosureInventory } from './FiscalProductionOperationsTransitionClosureInventory';
import { FiscalProductionOperationsTransitionFinalChecklist } from './FiscalProductionOperationsTransitionFinalChecklist';
import { FiscalProductionOperationsTransitionEvidencePackageService } from './FiscalProductionOperationsTransitionEvidencePackageService';
import { FiscalProductionOperationsNoActivationHandoffService } from './FiscalProductionOperationsNoActivationHandoffService';
import { FiscalProductionOperationsPostClosureRoadmap } from './FiscalProductionOperationsPostClosureRoadmap';
import { FiscalProductionOperationsTransitionFinalBlockerRegister } from './FiscalProductionOperationsTransitionFinalBlockerRegister';
import { FiscalProductionOperationsTransitionFinalRiskRegister } from './FiscalProductionOperationsTransitionFinalRiskRegister';

export class FiscalProductionOperationsTransitionClosureEvaluationService {
  public static evaluate(input: FiscalProductionOperationsTransitionClosureInput): FiscalProductionOperationsTransitionClosureResult {
    const policyResult = FiscalProductionOperationsTransitionClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionOperationsTransitionClosureResult;
    }

    FiscalProductionOperationsTransitionClosureInventory.getInventory();
    FiscalProductionOperationsTransitionFinalChecklist.getChecklist();
    FiscalProductionOperationsTransitionEvidencePackageService.getPackage();
    FiscalProductionOperationsNoActivationHandoffService.getHandoff();
    FiscalProductionOperationsPostClosureRoadmap.getRoadmap();

    const baseResult = FiscalProductionOperationsTransitionClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionOperationsTransitionFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionOperationsTransitionFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

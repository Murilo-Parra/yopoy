import { FiscalProductionActivationClosureInput, FiscalProductionActivationClosureResult } from './FiscalProductionActivationClosureTypes';
import { FiscalProductionActivationClosurePolicy } from './FiscalProductionActivationClosurePolicy';
import { FiscalProductionActivationFinalBlockerRegister } from './FiscalProductionActivationFinalBlockerRegister';
import { FiscalProductionActivationFinalRiskRegister } from './FiscalProductionActivationFinalRiskRegister';
import { FiscalProductionActivationClosureInventory } from './FiscalProductionActivationClosureInventory';
import { FiscalProductionActivationFinalChecklist } from './FiscalProductionActivationFinalChecklist';
import { FiscalProductionActivationEvidencePackageService } from './FiscalProductionActivationEvidencePackageService';
import { FiscalProductionFinalReadinessReview } from './FiscalProductionFinalReadinessReview';
import { FiscalProductionFinalReleaseHandoffService } from './FiscalProductionFinalReleaseHandoffService';
import { FiscalProductionPostClosureRoadmap } from './FiscalProductionPostClosureRoadmap';

export class FiscalProductionActivationClosureEvaluationService {
  public static evaluate(input: FiscalProductionActivationClosureInput): FiscalProductionActivationClosureResult {
    const policyResult = FiscalProductionActivationClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionActivationClosureResult;
    }

    // Conceptually generate all artifacts
    FiscalProductionActivationClosureInventory.generateInventory();
    FiscalProductionActivationFinalChecklist.generateChecklist();
    FiscalProductionActivationEvidencePackageService.generatePackage();
    FiscalProductionFinalReadinessReview.generateReview();
    FiscalProductionFinalReleaseHandoffService.generateHandoff();
    FiscalProductionPostClosureRoadmap.generateRoadmap();

    const baseResult = FiscalProductionActivationClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionActivationFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionActivationFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

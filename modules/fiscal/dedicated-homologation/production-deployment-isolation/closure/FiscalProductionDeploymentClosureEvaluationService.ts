import { FiscalProductionDeploymentClosureInput, FiscalProductionDeploymentClosureResult } from './FiscalProductionDeploymentClosureTypes';
import { FiscalProductionDeploymentClosurePolicy } from './FiscalProductionDeploymentClosurePolicy';
import { FiscalProductionDeploymentClosureInventory } from './FiscalProductionDeploymentClosureInventory';
import { FiscalProductionDeploymentFinalChecklist } from './FiscalProductionDeploymentFinalChecklist';
import { FiscalProductionDeploymentEvidencePackageService } from './FiscalProductionDeploymentEvidencePackageService';
import { FiscalProductionFinalReleaseReadinessReview } from './FiscalProductionFinalReleaseReadinessReview';
import { FiscalProductionNoActivationHandoffService } from './FiscalProductionNoActivationHandoffService';
import { FiscalProductionDeploymentPostClosureRoadmap } from './FiscalProductionDeploymentPostClosureRoadmap';
import { FiscalProductionDeploymentFinalBlockerRegister } from './FiscalProductionDeploymentFinalBlockerRegister';
import { FiscalProductionDeploymentFinalRiskRegister } from './FiscalProductionDeploymentFinalRiskRegister';

export class FiscalProductionDeploymentClosureEvaluationService {
  public static evaluate(input: FiscalProductionDeploymentClosureInput): FiscalProductionDeploymentClosureResult {
    const policyResult = FiscalProductionDeploymentClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionDeploymentClosureResult;
    }

    FiscalProductionDeploymentClosureInventory.generateInventory();
    FiscalProductionDeploymentFinalChecklist.generateChecklist();
    FiscalProductionDeploymentEvidencePackageService.generateEvidencePackage();
    FiscalProductionFinalReleaseReadinessReview.generateReview();
    FiscalProductionNoActivationHandoffService.generateHandoff();
    FiscalProductionDeploymentPostClosureRoadmap.generateRoadmap();

    const baseResult = FiscalProductionDeploymentClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionDeploymentFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionDeploymentFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

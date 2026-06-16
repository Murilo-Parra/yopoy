import { FiscalFinalGoLiveClosureInput, FiscalFinalGoLiveClosureResult } from './FiscalFinalGoLiveClosureTypes';
import { FiscalFinalGoLiveClosurePolicy } from './FiscalFinalGoLiveClosurePolicy';
import { FiscalFinalGoLiveClosureInventory } from './FiscalFinalGoLiveClosureInventory';
import { FiscalFinalGoLiveFinalChecklist } from './FiscalFinalGoLiveFinalChecklist';
import { FiscalFinalGoLiveEvidencePackageService } from './FiscalFinalGoLiveEvidencePackageService';
import { FiscalFinalGoLiveNoActivationHandoffService } from './FiscalFinalGoLiveNoActivationHandoffService';
import { FiscalFinalGoLivePostClosureRoadmap } from './FiscalFinalGoLivePostClosureRoadmap';
import { FiscalFinalGoLiveFinalReadinessReview } from './FiscalFinalGoLiveFinalReadinessReview';
import { FiscalFinalGoLiveFinalBlockerRegister } from './FiscalFinalGoLiveFinalBlockerRegister';
import { FiscalFinalGoLiveFinalRiskRegister } from './FiscalFinalGoLiveFinalRiskRegister';

export class FiscalFinalGoLiveClosureEvaluationService {
  public static evaluate(input: FiscalFinalGoLiveClosureInput): FiscalFinalGoLiveClosureResult {
    const policyResult = FiscalFinalGoLiveClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalFinalGoLiveClosureResult;
    }

    FiscalFinalGoLiveClosureInventory.generateInventory();
    FiscalFinalGoLiveFinalChecklist.getChecklist();
    FiscalFinalGoLiveEvidencePackageService.generatePackage();
    FiscalFinalGoLiveNoActivationHandoffService.generateHandoff();
    FiscalFinalGoLivePostClosureRoadmap.generateRoadmap();
    FiscalFinalGoLiveFinalReadinessReview.review();

    const baseResult = FiscalFinalGoLiveClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalFinalGoLiveFinalBlockerRegister.getBlockers(),
      warnings: FiscalFinalGoLiveFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

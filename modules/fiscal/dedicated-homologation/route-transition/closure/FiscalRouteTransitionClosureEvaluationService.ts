import { FiscalRouteTransitionClosureInput, FiscalRouteTransitionClosureResult } from './FiscalRouteTransitionClosureTypes';
import { FiscalRouteTransitionClosurePolicy } from './FiscalRouteTransitionClosurePolicy';
import { FiscalRouteTransitionClosureInventory } from './FiscalRouteTransitionClosureInventory';
import { FiscalRouteTransitionFinalChecklist } from './FiscalRouteTransitionFinalChecklist';
import { FiscalRouteTransitionEvidencePackageService } from './FiscalRouteTransitionEvidencePackageService';
import { FiscalRouteTransitionProductionHandoffService } from './FiscalRouteTransitionProductionHandoffService';
import { FiscalRouteTransitionPostClosureRoadmap } from './FiscalRouteTransitionPostClosureRoadmap';
import { FiscalRouteTransitionFinalBlockerRegister } from './FiscalRouteTransitionFinalBlockerRegister';
import { FiscalRouteTransitionFinalRiskRegister } from './FiscalRouteTransitionFinalRiskRegister';

export class FiscalRouteTransitionClosureEvaluationService {
  public static evaluate(input: FiscalRouteTransitionClosureInput): FiscalRouteTransitionClosureResult {
    const policyResult = FiscalRouteTransitionClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRouteTransitionClosureResult;
    }

    FiscalRouteTransitionClosureInventory.generateInventory();
    FiscalRouteTransitionFinalChecklist.generateChecklist();
    FiscalRouteTransitionEvidencePackageService.generatePackage();
    FiscalRouteTransitionProductionHandoffService.generateHandoff();
    FiscalRouteTransitionPostClosureRoadmap.generateRoadmap();

    const baseResult = FiscalRouteTransitionClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRouteTransitionFinalBlockerRegister.getBlockers(),
      warnings: FiscalRouteTransitionFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

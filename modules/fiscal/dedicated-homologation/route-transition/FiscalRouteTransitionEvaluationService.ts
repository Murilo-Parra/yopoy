import { FiscalRouteTransitionInput, FiscalRouteTransitionResult } from './FiscalRouteTransitionTypes';
import { FiscalRouteTransitionPolicy } from './FiscalRouteTransitionPolicy';
import { FiscalRouteTransitionBlueprint } from './FiscalRouteTransitionBlueprint';
import { FiscalLegacyRouteInventory } from './FiscalLegacyRouteInventory';
import { FiscalV2RouteReadinessInventory } from './FiscalV2RouteReadinessInventory';
import { FiscalLegacyPreservationContract } from './FiscalLegacyPreservationContract';
import { FiscalNoInterceptionContract } from './FiscalNoInterceptionContract';
import { FiscalRouteFallbackPlan } from './FiscalRouteFallbackPlan';
import { FiscalRouteDependencyMatrix } from './FiscalRouteDependencyMatrix';
import { FiscalRouteTransitionBlockerRegister } from './FiscalRouteTransitionBlockerRegister';
import { FiscalRouteTransitionRiskRegister } from './FiscalRouteTransitionRiskRegister';

export class FiscalRouteTransitionEvaluationService {
  public static evaluate(input: FiscalRouteTransitionInput): FiscalRouteTransitionResult {
    const policyResult = FiscalRouteTransitionPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRouteTransitionResult;
    }

    FiscalRouteTransitionBlueprint.generateBlueprint();
    FiscalLegacyRouteInventory.generateInventory();
    FiscalV2RouteReadinessInventory.generateInventory();
    FiscalLegacyPreservationContract.generateContract();
    FiscalNoInterceptionContract.generateContract();
    FiscalRouteFallbackPlan.generatePlan();
    FiscalRouteDependencyMatrix.generateMatrix();

    const baseResult = FiscalRouteTransitionPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRouteTransitionBlockerRegister.getBlockers(),
      warnings: FiscalRouteTransitionRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

import { FiscalProductionRouteReroutingClosureInput, FiscalProductionRouteReroutingClosureResult } from './FiscalProductionRouteReroutingClosureTypes';
import { FiscalProductionRouteReroutingClosurePolicy } from './FiscalProductionRouteReroutingClosurePolicy';
import { FiscalProductionRouteReroutingClosureInventory } from './FiscalProductionRouteReroutingClosureInventory';
import { FiscalProductionRouteReroutingNoOpPlan } from './FiscalProductionRouteReroutingNoOpPlan';
import { FiscalProductionLegacyFallbackNoOpPlan } from './FiscalProductionLegacyFallbackNoOpPlan';
import { FiscalProductionRouteInvariantEvidence } from './FiscalProductionRouteInvariantEvidence';
import { FiscalProductionNoTrafficChangeEvidence } from './FiscalProductionNoTrafficChangeEvidence';
import { FiscalProductionStaticRouteComparisonPlan } from './FiscalProductionStaticRouteComparisonPlan';
import { FiscalProductionRouteReversionMatrix } from './FiscalProductionRouteReversionMatrix';
import { FiscalProductionTrafficSafetyMatrix } from './FiscalProductionTrafficSafetyMatrix';
import { FiscalProductionRouteReroutingDependencyMatrix } from './FiscalProductionRouteReroutingDependencyMatrix';
import { FiscalProductionRouteReroutingClosureBlockerRegister } from './FiscalProductionRouteReroutingClosureBlockerRegister';
import { FiscalProductionRouteReroutingClosureRiskRegister } from './FiscalProductionRouteReroutingClosureRiskRegister';

export class FiscalProductionRouteReroutingClosureEvaluationService {
  public static evaluate(input: FiscalProductionRouteReroutingClosureInput): FiscalProductionRouteReroutingClosureResult {
    const policyResult = FiscalProductionRouteReroutingClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRouteReroutingClosureResult;
    }

    FiscalProductionRouteReroutingClosureInventory.getInventory();
    FiscalProductionRouteReroutingNoOpPlan.getPlan();
    FiscalProductionLegacyFallbackNoOpPlan.getPlan();
    FiscalProductionRouteInvariantEvidence.getEvidence();
    FiscalProductionNoTrafficChangeEvidence.getEvidence();
    FiscalProductionStaticRouteComparisonPlan.getPlan();
    FiscalProductionRouteReversionMatrix.getMatrix();
    FiscalProductionTrafficSafetyMatrix.getMatrix();
    FiscalProductionRouteReroutingDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRouteReroutingClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRouteReroutingClosureBlockerRegister.getBlockers(),
      warnings: FiscalProductionRouteReroutingClosureRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

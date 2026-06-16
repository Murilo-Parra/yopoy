import { FiscalRouteProxyDryRunInput, FiscalRouteProxyDryRunResult } from './FiscalRouteProxyDryRunTypes';
import { FiscalRouteProxyDryRunPolicy } from './FiscalRouteProxyDryRunPolicy';
import { FiscalRouteProxyBlueprint } from './FiscalRouteProxyBlueprint';
import { FiscalRouteMiddlewareSimulationPlan } from './FiscalRouteMiddlewareSimulationPlan';
import { FiscalRouteTapSimulationPlan } from './FiscalRouteTapSimulationPlan';
import { FiscalRouteConditionalRoutingSimulation } from './FiscalRouteConditionalRoutingSimulation';
import { FiscalRouteNoInterceptionEvidence } from './FiscalRouteNoInterceptionEvidence';
import { FiscalRouteProxyFallbackSimulation } from './FiscalRouteProxyFallbackSimulation';
import { FiscalRouteProxyDependencyMatrix } from './FiscalRouteProxyDependencyMatrix';
import { FiscalRouteProxyDryRunBlockerRegister } from './FiscalRouteProxyDryRunBlockerRegister';
import { FiscalRouteProxyDryRunRiskRegister } from './FiscalRouteProxyDryRunRiskRegister';

export class FiscalRouteProxyDryRunEvaluationService {
  public static evaluate(input: FiscalRouteProxyDryRunInput): FiscalRouteProxyDryRunResult {
    const policyResult = FiscalRouteProxyDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRouteProxyDryRunResult;
    }

    FiscalRouteProxyBlueprint.generateBlueprint();
    FiscalRouteMiddlewareSimulationPlan.generatePlan();
    FiscalRouteTapSimulationPlan.generatePlan();
    FiscalRouteConditionalRoutingSimulation.simulateRouting();
    FiscalRouteNoInterceptionEvidence.generateEvidence();
    FiscalRouteProxyFallbackSimulation.simulateFallback();
    FiscalRouteProxyDependencyMatrix.generateMatrix();

    const baseResult = FiscalRouteProxyDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRouteProxyDryRunBlockerRegister.getBlockers(),
      warnings: FiscalRouteProxyDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

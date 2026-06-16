import { FiscalRouteCanaryShadowInput, FiscalRouteCanaryShadowResult } from './FiscalRouteCanaryShadowDryRunTypes';
import { FiscalRouteCanaryShadowPolicy } from './FiscalRouteCanaryShadowPolicy';
import { FiscalRouteCanaryScopeSimulation } from './FiscalRouteCanaryScopeSimulation';
import { FiscalRouteShadowTrafficSimulationPlan } from './FiscalRouteShadowTrafficSimulationPlan';
import { FiscalRouteTrafficMirrorApprovalGate } from './FiscalRouteTrafficMirrorApprovalGate';
import { FiscalRouteCanaryEligibilityMatrix } from './FiscalRouteCanaryEligibilityMatrix';
import { FiscalRouteMirrorSafetyChecklist } from './FiscalRouteMirrorSafetyChecklist';
import { FiscalRouteShadowNoCaptureEvidence } from './FiscalRouteShadowNoCaptureEvidence';
import { FiscalRouteCanaryRollbackReadiness } from './FiscalRouteCanaryRollbackReadiness';
import { FiscalRouteCanaryShadowDependencyMatrix } from './FiscalRouteCanaryShadowDependencyMatrix';
import { FiscalRouteCanaryShadowBlockerRegister } from './FiscalRouteCanaryShadowBlockerRegister';
import { FiscalRouteCanaryShadowRiskRegister } from './FiscalRouteCanaryShadowRiskRegister';

export class FiscalRouteCanaryShadowEvaluationService {
  public static evaluate(input: FiscalRouteCanaryShadowInput): FiscalRouteCanaryShadowResult {
    const policyResult = FiscalRouteCanaryShadowPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRouteCanaryShadowResult;
    }

    FiscalRouteCanaryScopeSimulation.simulateScope();
    FiscalRouteShadowTrafficSimulationPlan.generatePlan();
    FiscalRouteTrafficMirrorApprovalGate.generateGate();
    FiscalRouteCanaryEligibilityMatrix.generateMatrix();
    FiscalRouteMirrorSafetyChecklist.getChecklist();
    FiscalRouteShadowNoCaptureEvidence.generateEvidence();
    FiscalRouteCanaryRollbackReadiness.review();
    FiscalRouteCanaryShadowDependencyMatrix.generateMatrix();

    const baseResult = FiscalRouteCanaryShadowPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRouteCanaryShadowBlockerRegister.getBlockers(),
      warnings: FiscalRouteCanaryShadowRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

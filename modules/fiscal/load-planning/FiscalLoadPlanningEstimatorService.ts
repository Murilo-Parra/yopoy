import { FiscalLoadEstimateInput, FiscalLoadEstimateResult, FiscalLoadPlanningStatus } from './FiscalLoadPlanningTypes';
import { FiscalLoadPlanningPolicy } from './FiscalLoadPlanningPolicy';
import { FiscalSyntheticScenarioCatalog } from './FiscalSyntheticScenarioCatalog';

export class FiscalLoadPlanningEstimatorService {
  public static async estimate(input: FiscalLoadEstimateInput): Promise<FiscalLoadEstimateResult> {
    const policyResult = FiscalLoadPlanningPolicy.evaluateEstimateRequest(input);

    const warnings: string[] = ['Load Planning aceita apenas estimativas sintéticas e não executa tráfego real.'];
    let estimatedTotalRequests = 0;
    let estimatedPeakRpm = 0;

    if (policyResult.allowed) {
        estimatedTotalRequests = input.durationMinutes * input.targetRpm;
        estimatedPeakRpm = input.targetRpm * 1.5; // Simulate peak as 50% above target
    }

    return {
      success: policyResult.allowed,
      status: policyResult.status,
      scenarioCount: input.scenarioIds?.length || 0,
      estimatedTotalRequests,
      estimatedPeakRpm,
      warnings,
      blockers: policyResult.blockers,
      planningOnly: true,
      syntheticOnly: true,
      loadExecuted: false,
      callsRealEndpoint: false,
      callsLegacyHandler: false,
      callsV2Handler: false,
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealLoadTest: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}

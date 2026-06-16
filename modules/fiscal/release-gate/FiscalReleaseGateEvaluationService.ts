import { FiscalReleaseGateEvaluationInput, FiscalReleaseGateEvaluationResult } from './FiscalReleaseGateTypes';
import { FiscalReleaseGatePolicy } from './FiscalReleaseGatePolicy';
import { FiscalReleaseGateSignalInventory } from './FiscalReleaseGateSignalInventory';

export class FiscalReleaseGateEvaluationService {
  public static async evaluate(input: FiscalReleaseGateEvaluationInput): Promise<FiscalReleaseGateEvaluationResult> {
    const policyResult = FiscalReleaseGatePolicy.evaluateRequest(input);
    const signals = FiscalReleaseGateSignalInventory.getSignals();

    const warnings = ['Release evaluation is simulated. No real actions possible.'];

    return {
      success: true,
      status: policyResult.status,
      go: false,
      noGo: true,
      approvedForRelease: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      releaseActivated: false,
      canaryActivated: false,
      trafficChanged: false,
      blockers: policyResult.blockers,
      warnings,
      signals,
      readOnly: true,
      governanceOnly: true,
      releasePlanningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}

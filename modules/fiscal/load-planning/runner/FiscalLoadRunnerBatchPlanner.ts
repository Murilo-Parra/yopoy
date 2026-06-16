import { FiscalLoadRunnerBatchPlanInput, FiscalLoadRunnerBatchPlan, FiscalLoadRunnerStatus } from './FiscalLoadRunnerTypes';
import { FiscalLoadRunnerPolicy } from './FiscalLoadRunnerPolicy';
import { FiscalSyntheticScenarioCatalog } from '../FiscalSyntheticScenarioCatalog';

export class FiscalLoadRunnerBatchPlanner {
  public static async planBatch(input: FiscalLoadRunnerBatchPlanInput): Promise<FiscalLoadRunnerBatchPlan> {
    const policyResult = FiscalLoadRunnerPolicy.evaluateBatchPlan(input);

    const warnings: string[] = ['Load Runner Tooling Architecture não executa tráfego real, não cria worker e não chama endpoints reais.'];
    let estimatedTotalRequests = 0;
    let estimatedConcurrency = 0;
    let estimatedSyntheticEvents = 0;

    if (policyResult.allowed) {
        estimatedTotalRequests = input.plannedDurationMinutes * input.plannedRpm;
        estimatedConcurrency = input.plannedConcurrency || Math.ceil(input.plannedRpm / 60);
        estimatedSyntheticEvents = estimatedTotalRequests * (input.scenarioIds?.length || 1);
    }

    return {
      success: policyResult.allowed,
      status: policyResult.status,
      scenarioIds: input.scenarioIds || [],
      estimatedTotalRequests,
      estimatedConcurrency,
      estimatedSyntheticEvents,
      warnings,
      blockers: policyResult.blockers,
      executionEnabled: false,
      executionStarted: false,
      loadExecuted: false,
      realTrafficGenerated: false,
      callsRealEndpoint: false,
      callsLegacyHandler: false,
      callsV2Handler: false,
      workerCreated: false,
      schedulerCreated: false,
      routeToV2: false,
      routeToLegacy: true,
      toolingDesignOnly: true,
      planningOnly: true,
      syntheticOnly: true,
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

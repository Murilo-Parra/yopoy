import { FiscalLoadPlanningClosureEvidence } from './FiscalLoadPlanningClosureTypes';
import { FiscalSyntheticScenarioCatalog } from '../FiscalSyntheticScenarioCatalog';

export class FiscalLoadPlanningClosureEvidenceService {
  public static getEvidence(): FiscalLoadPlanningClosureEvidence {
    const scenarios = FiscalSyntheticScenarioCatalog.getScenarios();
    const criticalScenariosBlocked = scenarios.filter(s => s.risk === 'CRITICAL').length;

    return {
      generatedAt: new Date().toISOString(),
      syntheticScenariosCount: scenarios.length,
      criticalScenariosBlocked,
      lastEstimatesCount: 0, // Mock: would read from estimator audit
      lastBatchPlansCount: 0, // Mock: would read from runner audit
      realLoadExecuted: false,
      realTrafficGenerated: false,
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      readOnly: true,
      planningOnly: true,
      syntheticOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealLoadTest: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}

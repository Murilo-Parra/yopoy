import { FiscalLoadRunnerBatchPlanInput } from './FiscalLoadRunnerTypes';
import { FiscalLoadRunnerPolicy } from './FiscalLoadRunnerPolicy';

export class FiscalLoadRunnerDecisionService {
  public static simulateDecision(input: any): any {
    const policyResult = FiscalLoadRunnerPolicy.evaluateBatchPlan(input);
    return {
      allowed: policyResult.allowed,
      status: policyResult.status,
      blockers: policyResult.blockers,
      executionEnabled: false,
      executionStarted: false,
      loadExecuted: false,
      realTrafficGenerated: false,
      callsRealEndpoint: false,
      workerCreated: false,
      schedulerCreated: false
    };
  }
}

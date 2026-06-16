import { FiscalLoadRunnerStatus } from './FiscalLoadRunnerTypes';
import { FiscalSyntheticScenarioCatalog } from '../FiscalSyntheticScenarioCatalog';
import { FiscalLoadRiskClassifier } from '../FiscalLoadRiskClassifier';

export class FiscalLoadRunnerPolicy {
  public static evaluateBatchPlan(input: any): { allowed: boolean; status: string; blockers: string[] } {
    const blockers: string[] = [];
    let status: string = FiscalLoadRunnerStatus.BATCH_PLAN_READY;

    if (input.plannedDurationMinutes > 1440 || input.plannedRpm > 100000 || input.plannedConcurrency > 10000) {
      blockers.push('Duration, RPM, or Concurrency limits exceeded. Abusive parameter attempt.');
    }

    if (input.metadata?.callsRealEndpoint === true) {
      blockers.push('Metadata implies a real endpoint call attempt.');
    }
    
    if (input.metadata?.executionEnabled === true || input.metadata?.realTrafficGenerated === true || input.metadata?.workerCreated === true || input.metadata?.schedulerCreated === true) {
      blockers.push('Execution attributes requested in purely synthetic planner.');
    }

    const { scenarioIds = [] } = input;
    for (const id of scenarioIds) {
      const scenario = FiscalSyntheticScenarioCatalog.getScenarioById(id);
      if (!scenario) {
        blockers.push(`Scenario ${id} not found.`);
        continue;
      }

      const riskCheck = FiscalLoadRiskClassifier.isScenarioBlocked(scenario);
      if (riskCheck.blocked) {
        blockers.push(`Scenario ${id} is blocked: ${riskCheck.reason}`);
      }
    }

    if (blockers.length > 0) {
      if (blockers.some(b => b.includes('CRITICAL/HIGH'))) {
        status = FiscalLoadRunnerStatus.BLOCKED_BY_GUARDRAIL;
      } else if (blockers.some(b => b.includes('real endpoint') || b.includes('Execution attributes'))) {
        status = FiscalLoadRunnerStatus.BLOCKED_BY_REAL_TRAFFIC_ATTEMPT;
      } else {
        status = FiscalLoadRunnerStatus.BLOCKED_BY_GUARDRAIL;
      }
    }

    if (status === FiscalLoadRunnerStatus.BATCH_PLAN_READY && !blockers.length) {
        blockers.push('Load Runner Tooling Architecture não executa tráfego real, não cria worker e não chama endpoints reais.');
    }

    return {
      allowed: blockers.length === 1 && blockers[0].includes('não executa tráfego real'),
      status,
      blockers: status === FiscalLoadRunnerStatus.BATCH_PLAN_READY ? [] : blockers
    };
  }
}

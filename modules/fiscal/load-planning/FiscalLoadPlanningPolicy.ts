import { FiscalLoadPlanningStatus } from './FiscalLoadPlanningTypes';
import { FiscalSyntheticScenarioCatalog } from './FiscalSyntheticScenarioCatalog';
import { FiscalLoadRiskClassifier } from './FiscalLoadRiskClassifier';

export class FiscalLoadPlanningPolicy {
  public static evaluateEstimateRequest(input: any): { allowed: boolean; status: string; blockers: string[] } {
    const blockers: string[] = [];
    let status: string = FiscalLoadPlanningStatus.ESTIMATE_READY;

    if (input.durationMinutes > 1440 || input.targetRpm > 100000) {
      blockers.push('Duration or RPM limits exceeded. Abusive parameter attempt.');
    }

    if (input.metadata?.callsRealEndpoint === true) {
      blockers.push('Metadata implies a real endpoint call attempt.');
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
        status = FiscalLoadPlanningStatus.BLOCKED_BY_CRITICAL_DEPENDENCY;
      } else if (blockers.some(b => b.includes('real endpoint'))) {
        status = FiscalLoadPlanningStatus.BLOCKED_BY_REAL_TRAFFIC_ATTEMPT;
      } else {
        status = FiscalLoadPlanningStatus.BLOCKED_BY_GUARDRAIL;
      }
    }

    if (status === FiscalLoadPlanningStatus.ESTIMATE_READY && !blockers.length) {
        blockers.push('Load Planning aceita apenas estimativas sintéticas e não executa tráfego real.');
    }

    return {
      allowed: blockers.length === 1 && blockers[0].includes('estimativas sintéticas'),
      status,
      blockers: status === FiscalLoadPlanningStatus.ESTIMATE_READY ? [] : blockers
    };
  }
}

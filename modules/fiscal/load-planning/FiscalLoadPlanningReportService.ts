import { FiscalLoadPlanningReport } from './FiscalLoadPlanningTypes';
import { FiscalSyntheticScenarioCatalog } from './FiscalSyntheticScenarioCatalog';
import { FiscalLoadPlanningGuardrails } from './FiscalLoadPlanningGuardrails';

export class FiscalLoadPlanningReportService {
  public static getReport(): FiscalLoadPlanningReport {
    const scenarios = FiscalSyntheticScenarioCatalog.getScenarios();
    const riskSummary = scenarios.reduce((acc, scenario) => {
      acc[scenario.risk] = (acc[scenario.risk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      generatedAt: new Date().toISOString(),
      scenarios,
      guardrails: FiscalLoadPlanningGuardrails.getChecklist(),
      riskSummary,
      lastEstimates: [], // In a real scenario, this could query Audit logs
      readOnly: true,
      planningOnly: true,
      syntheticOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}

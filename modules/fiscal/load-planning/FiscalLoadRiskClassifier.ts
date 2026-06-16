import { FiscalSyntheticLoadScenario } from './FiscalLoadPlanningTypes';

export class FiscalLoadRiskClassifier {
  public static isScenarioBlocked(scenario: FiscalSyntheticLoadScenario): { blocked: boolean; reason?: string } {
    if (scenario.risk === 'CRITICAL' || scenario.routeGroup === 'CRITICAL' || scenario.routeGroup === 'HIGH') {
      return { blocked: true, reason: 'Scenario is classified as CRITICAL/HIGH and is blocked.' };
    }

    if (scenario.invokesSefaz || scenario.signsXml || scenario.generatesPdf || scenario.writesFiscalTables) {
      return { blocked: true, reason: 'Scenario involves real SEFAZ/XML/PDF/Write which is blocked.' };
    }

    if (scenario.callsRealEndpoint || !scenario.syntheticOnly) {
      return { blocked: true, reason: 'Scenario attempts to call real endpoint or is not purely synthetic.' };
    }

    return { blocked: false };
  }
}

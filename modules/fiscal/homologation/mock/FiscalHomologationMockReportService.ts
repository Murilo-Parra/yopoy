import { FiscalHomologationMockReport } from './FiscalHomologationMockTypes';
import { FiscalHomologationMockScenarioCatalog } from './FiscalHomologationMockScenarioCatalog';

export class FiscalHomologationMockReportService {
  public static getReport(): FiscalHomologationMockReport {
    return {
      generatedAt: new Date().toISOString(),
      scenarios: FiscalHomologationMockScenarioCatalog.getScenarios(),
      lastExecutions: [], // Mock persistence not required or kept light
      totals: { totalSimulations: 0 },
      readOnly: true,
      mockOnly: true,
      sandboxOnly: true,
      dryRunOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForHomologationExecution: false,
      approvedForProductionV2: false
    };
  }
}

import { FiscalProductionComplianceRollbackShutdownResult } from './FiscalProductionComplianceRollbackShutdownTypes';

export class FiscalProductionComplianceRollbackShutdownReportService {
  public static generateReport(result: FiscalProductionComplianceRollbackShutdownResult) {
    return {
      reportId: `REP-ROLLBACK-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      scenario: 'PRODUCTION_COMPLIANCE_ROLLBACK_SHUTDOWN_DRY_RUN',
      result,
      governanceOnly: true,
      simulationOnly: true,
      disclaimer: 'This is a simulation report only. No real rollback or shutdown occurred.'
    };
  }
}

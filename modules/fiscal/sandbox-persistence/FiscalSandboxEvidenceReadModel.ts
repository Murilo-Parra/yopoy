import { FiscalSandboxIntegrityReportService } from './FiscalSandboxIntegrityReportService';

export class FiscalSandboxEvidenceReadModel {
  private reportService: FiscalSandboxIntegrityReportService;

  constructor() {
    this.reportService = new FiscalSandboxIntegrityReportService();
  }

  public async getEvidenceSummary(companyId: string): Promise<any> {
    const report = await this.reportService.generateReport(companyId);
    
    return {
      integrityReport: report,
      sandboxOnly: true,
      productionWrite: false,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}

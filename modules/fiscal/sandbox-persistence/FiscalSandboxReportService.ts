import { FiscalSandboxPersistenceRepository } from './FiscalSandboxPersistenceRepository';
import { FiscalSandboxPersistenceReport } from './FiscalSandboxPersistenceTypes';

export class FiscalSandboxReportService {
  private repository: FiscalSandboxPersistenceRepository;

  constructor() {
    this.repository = new FiscalSandboxPersistenceRepository();
  }

  public async generateReport(companyId: string): Promise<FiscalSandboxPersistenceReport> {
    if (!companyId) throw new Error('companyId is required for reports');

    const dbReport = await this.repository.getReport(companyId);
    
    let totalStored = 0;
    let totalReviewed = 0;
    let totalCleaned = 0;
    let totalBlocked = 0;
    let totalExpired = 0;

    for (const row of dbReport.totals) {
      const count = parseInt(row.count, 10) || 0;
      switch (row.status) {
        case 'STORED': totalStored += count; break;
        case 'REVIEWED': totalReviewed += count; break;
        case 'CLEANED': totalCleaned += count; break;
        case 'BLOCKED': totalBlocked += count; break;
        case 'FAILED_SAFE': totalBlocked += count; break;
        case 'EXPIRED': totalExpired += count; break;
      }
    }

    const statusBySource: Record<string, Record<string, number>> = {};
    for (const row of dbReport.sources) {
      if (!statusBySource[row.source]) {
        statusBySource[row.source] = {};
      }
      statusBySource[row.source][row.status] = parseInt(row.count, 10) || 0;
    }

    return {
      generatedAt: new Date().toISOString(),
      totalStored,
      totalReviewed,
      totalCleaned,
      totalBlocked,
      totalExpired,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      statusBySource
    };
  }
}

import { FiscalSandboxPersistenceRepository } from './FiscalSandboxPersistenceRepository';

export class FiscalSandboxReviewReportService {
  private repository: FiscalSandboxPersistenceRepository;

  constructor() {
    this.repository = new FiscalSandboxPersistenceRepository();
  }

  public async generateReport(companyId: string): Promise<any> {
    const rawReport = await this.repository.getReport(companyId);
    
    // Process totals
    let totalSnapshots = 0;
    let totalReviewed = 0;
    let totalRetained = 0;
    let totalCleanupEligible = 0;
    let totalCleaned = 0;
    let totalBlocked = 0;

    if (rawReport && rawReport.totals) {
      for (const t of rawReport.totals) {
        const count = parseInt(t.count) || 0;
        totalSnapshots += count;
        if (t.status === 'REVIEWED') totalReviewed += count;
        if (t.status === 'RETAIN_FOR_ANALYSIS') totalRetained += count;
        if (t.status === 'ELIGIBLE_FOR_CLEANUP') totalCleanupEligible += count;
        if (t.status === 'BLOCKED_FOR_SAFETY') totalBlocked += count;
      }
    }

    return {
      generatedAt: new Date().toISOString(),
      totalSnapshots,
      totalReviewed,
      totalRetained,
      totalCleanupEligible,
      totalCleaned,
      totalBlocked,
      rawTotals: rawReport.totals,
      rawSources: rawReport.sources,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}

import { FiscalSandboxIntegrityMetricsService } from './FiscalSandboxIntegrityMetricsService';
import { FiscalSandboxIntegrityRiskService } from './FiscalSandboxIntegrityRiskService';
import { FiscalSandboxIntegrityReport } from './FiscalSandboxIntegrityTypes';

export class FiscalSandboxIntegrityReportService {
  private metricsService: FiscalSandboxIntegrityMetricsService;
  private riskService: FiscalSandboxIntegrityRiskService;

  constructor() {
    this.metricsService = new FiscalSandboxIntegrityMetricsService();
    this.riskService = new FiscalSandboxIntegrityRiskService();
  }

  public async generateReport(companyId: string): Promise<FiscalSandboxIntegrityReport> {
    const summary = await this.metricsService.getSummary(companyId);
    const qualityScore = await this.metricsService.getQualityScore(companyId);
    
    // Evaluate risks
    const issues = this.riskService.evaluateRisks(qualityScore, summary.source, summary.route);

    return {
      generatedAt: new Date().toISOString(),
      summary,
      qualityScore,
      issues,
      risks: issues.filter(i => i.blockerForRealActivation),
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}

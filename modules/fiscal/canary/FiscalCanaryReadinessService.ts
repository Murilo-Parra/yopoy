import { FiscalShadowGovernanceService } from "../shadow/FiscalShadowGovernanceService";
import { FiscalShadowDashboardService } from "../shadow/FiscalShadowDashboardService";
import { ShadowDashboardFiltersDTO } from "../dto/ShadowDashboardDTOs";
import { FiscalCanaryConfig } from "./FiscalCanaryConfig";

export class FiscalCanaryReadinessService {
  private governanceService = new FiscalShadowGovernanceService();
  private dashboardService = new FiscalShadowDashboardService();

  public async evaluateRouteReadiness(route: string, companyId?: string): Promise<{
    isReady: boolean;
    readinessScore: number;
    sampleSize: number;
    blockers: number;
    highDivergences: number;
    reason: string;
  }> {
    const filters: ShadowDashboardFiltersDTO = { route };
    if (companyId) {
      filters.companyId = companyId;
    }

    const summary = await this.dashboardService.getSummary(filters);
    const governance = await this.governanceService.evaluateReadiness(filters);

    const requiredScore = FiscalCanaryConfig.getMinimumReadinessScore();
    const requiredSamples = FiscalCanaryConfig.getRequiredSampleSize();

    const sampleSize = summary.totalRuns;
    const score = governance.readinessScore;
    const blockers = summary.totalBySeverity["BLOCKER"] || 0;
    const highDivergences = summary.totalBySeverity["HIGH"] || 0;

    if (sampleSize < requiredSamples) {
      return {
        isReady: false,
        readinessScore: score,
        sampleSize,
        blockers,
        highDivergences,
        reason: `Amostragem insuficiente: ${sampleSize}/${requiredSamples}`,
      };
    }

    if (blockers > 0) {
      return {
        isReady: false,
        readinessScore: score,
        sampleSize,
        blockers,
        highDivergences,
        reason: `Existem ${blockers} divergências BLOCKER impeditivas.`,
      };
    }

    if (score < requiredScore) {
      return {
        isReady: false,
        readinessScore: score,
        sampleSize,
        blockers,
        highDivergences,
        reason: `Score de maturidade insuficiente: ${score}/${requiredScore}`,
      };
    }

    return {
      isReady: true,
      readinessScore: score,
      sampleSize,
      blockers,
      highDivergences,
      reason: "Maturidade adequada para planejamento Canary.",
    };
  }
}

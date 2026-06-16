import { FiscalShadowDashboardService } from "./FiscalShadowDashboardService";
import { ShadowDashboardFiltersDTO, ShadowGovernanceDTO, ShadowGovernanceWarning } from "../dto/ShadowDashboardDTOs";

export class FiscalShadowGovernanceService {
  private dashboardService = new FiscalShadowDashboardService();

  public async evaluateReadiness(filters: ShadowDashboardFiltersDTO): Promise<ShadowGovernanceDTO> {
    const summary = await this.dashboardService.getSummary(filters);
    
    // Readiness classification logic
    const score = summary.readinessScore;
    let readinessClass = "NOT_READY";
    let recommendedNextSprint = "Focar na correção de Blockers e falhas fundamentais.";

    if (summary.totalRuns === 0) {
      readinessClass = "NO_DATA";
      recommendedNextSprint = "Aumentar tráfego no Shadow Routing passivo.";
    } else if (score >= 90) {
      readinessClass = "READY_FOR_LIMITED_CANARY";
      recommendedNextSprint = "Considerar ativação Canary controlada em poucos clientes.";
    } else if (score >= 75) {
      readinessClass = "NEEDS_MINOR_FIXES";
      recommendedNextSprint = "Corrigir divergências High/Medium remanescentes.";
    } else if (score >= 50) {
      readinessClass = "NEEDS_SIGNIFICANT_FIXES";
      recommendedNextSprint = "Analisar causas raiz das divergências estruturais.";
    }

    const blockers: string[] = [];
    const warnings: ShadowGovernanceWarning[] = [];

    // Identify Blockers
    if ((summary.totalBySeverity["BLOCKER"] || 0) > 0) {
      blockers.push(`Existem ${summary.totalBySeverity["BLOCKER"]} divergências nível BLOCKER não resolvidas.`);
    }

    if ((summary.totalBySeverity["HIGH"] || 0) > 0) {
      warnings.push({ type: "HIGH_DIVERGENCE", message: `Atenção: ${summary.totalBySeverity["HIGH"]} alertas High.` });
    }
    
    if (summary.totalRuns > 0 && summary.totalMatched / summary.totalRuns < 0.5) {
      warnings.push({ type: "LOW_MATCH_RATE", message: "A taxa de adequação V2 vs Legado está abaixo de 50%." });
    }

    return {
      readinessScore: score,
      readinessClass,
      blockers,
      warnings,
      recommendedNextSprint
    };
  }
}

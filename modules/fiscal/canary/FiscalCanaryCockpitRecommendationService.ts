import { FiscalCanaryCockpitRecommendation, FiscalCanaryFinalReviewSimulation } from "./FiscalCanaryCockpitTypes";
import { FiscalCanaryCockpitReadModel } from "./FiscalCanaryCockpitReadModel";

export class FiscalCanaryCockpitRecommendationService {
  private readModel = new FiscalCanaryCockpitReadModel();

  public async getRecommendation(companyId?: string): Promise<FiscalCanaryCockpitRecommendation> {
    const shadow = await this.readModel.getAggregatedShadowMetrics(companyId);
    return {
      status: shadow.blockers > 0 ? "BLOCKED" : "ANALYSIS_ONLY",
      message: "Análise baseada em dados inertes. Nenhuma ativação será feita.",
      nextAction: "Revisar logs de divergência ou expandir base de requisições shadow.",
      allowedFuturePhase: "SIMULATION_PHASE",
      blockers: shadow.blockers > 0 ? ["Há inconsistências tipo BLOCKER na Shadow Audit."] : [],
      warnings: shadow.totalRuns < 10 ? ["Amostragem muito baixa para qualquer afirmação estatística."] : [],
      simulationOnly: true,
      activationBlocked: true
    };
  }

  public async simulateFinalReview(companyId?: string): Promise<FiscalCanaryFinalReviewSimulation> {
    const shadow = await this.readModel.getAggregatedShadowMetrics(companyId);
    const hasBlockers = shadow.blockers > 0;
    
    return {
      approvedForRealCanary: false, // Critical rule for Sprint 4.21
      simulationOnly: true,
      activationBlocked: true,
      decision: "REJECTED_BY_SPRINT_SCOPE",
      blockers: [
        "A Sprint 4.21 veda ativação de Canary real, independentemente do score.",
        ...(hasBlockers ? ["Encontrados blockers técnicos em Shadow."] : [])
      ],
      warnings: [
        "Nenhum tráfego foi alterado.",
        "Nenhum certificado foi usado.",
        "SEFAZ nunca foi acionado pela V2."
      ],
      requiredBeforeActivation: [
        "Aprovação formal da Sprint futura para release.",
        "Remoção das travas de 'activationBlocked: true'",
        "Garantia de 0 divergências BLOCKER/HIGH nas rotas Críticas."
      ]
    };
  }
}

import { FiscalCanaryRiskMatrix } from "./FiscalCanaryRiskMatrix";
import { FiscalCanaryReadinessService } from "./FiscalCanaryReadinessService";
import { FiscalCanaryEligibilityInput, FiscalCanaryStatus, FiscalCanaryDecision } from "./FiscalCanaryTypes";

export class FiscalCanaryEligibilityService {
  private readinessService = new FiscalCanaryReadinessService();

  public async evaluateEligibility(input: FiscalCanaryEligibilityInput): Promise<FiscalCanaryDecision> {
    const route = input.route;
    if (!route) {
      return this.buildBlocked("Rota não informada.");
    }

    const riskLevel = FiscalCanaryRiskMatrix.getRiskLevel(route);
    const isRiskAllowed = FiscalCanaryRiskMatrix.isCanaryAllowed(riskLevel);
    const riskReason = FiscalCanaryRiskMatrix.getReason(riskLevel);

    if (!isRiskAllowed) {
      return this.buildBlocked(`Rota não elegível devido ao risco. ${riskReason}`);
    }

    const readiness = await this.readinessService.evaluateRouteReadiness(route, input.companyId);

    const warnings: string[] = [];
    if (readiness.highDivergences > 0) {
      warnings.push(`Existem ${readiness.highDivergences} divergências HIGH que precisam ser monitoradas.`);
    }

    if (!readiness.isReady) {
      return {
        eligible: false,
        status: FiscalCanaryStatus.BLOCKED,
        readinessScore: readiness.readinessScore,
        blockers: [readiness.reason],
        warnings,
        allowedRoutes: [],
        deniedRoutes: [route],
        recommendation: "Corrigir blockers ou aguardar maior amostragem antes de planejar canary.",
        simulationOnly: true
      };
    }

    return {
      eligible: true,
      status: FiscalCanaryStatus.ELIGIBLE,
      readinessScore: readiness.readinessScore,
      blockers: [],
      warnings,
      allowedRoutes: [route],
      deniedRoutes: [],
      recommendation: "Rota elegível para canary simulado ou futuro controlado.",
      simulationOnly: true
    };
  }

  private buildBlocked(reason: string): FiscalCanaryDecision {
    return {
      eligible: false,
      status: FiscalCanaryStatus.BLOCKED,
      blockers: [reason],
      warnings: [],
      allowedRoutes: [],
      deniedRoutes: [],
      recommendation: "Rota não elegível. Alterações reais proibidas.",
      simulationOnly: true
    };
  }
}

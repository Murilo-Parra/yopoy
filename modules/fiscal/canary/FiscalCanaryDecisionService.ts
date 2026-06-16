import { FiscalCanaryEligibilityService } from "./FiscalCanaryEligibilityService";
import { FiscalCanaryEligibilityInput, FiscalCanaryDecision, FiscalCanaryStatus } from "./FiscalCanaryTypes";
import { FiscalCanaryConfig } from "./FiscalCanaryConfig";

export class FiscalCanaryDecisionService {
  private eligibilityService = new FiscalCanaryEligibilityService();

  public async simulateDecision(input: FiscalCanaryEligibilityInput, requestActivation: boolean): Promise<FiscalCanaryDecision> {
    if (requestActivation) {
      return {
        eligible: false,
        status: FiscalCanaryStatus.BLOCKED,
        blockers: ["Ativação real de Canary proibida na Sprint 4.17. Somente simulação de elegibilidade."],
        warnings: [],
        allowedRoutes: [],
        deniedRoutes: input.route ? [input.route] : [],
        recommendation: "Mantenha o tráfego no legado e avalie a simulação (activation: false).",
        simulationOnly: true
      };
    }

    if (FiscalCanaryConfig.getMode() !== FiscalCanaryStatus.SIMULATION_ONLY) {
       // Should never happen, but safety fallback
       return {
        eligible: false,
        status: FiscalCanaryStatus.BLOCKED,
        blockers: ["Configuração de Canary incompatível. Deve ser SIMULATION_ONLY."],
        warnings: [],
        allowedRoutes: [],
        deniedRoutes: [],
        recommendation: "Ajustar flags de ambiente.",
        simulationOnly: true
      };
    }

    return await this.eligibilityService.evaluateEligibility(input);
  }
}

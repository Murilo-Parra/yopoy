import { FiscalCanaryRuntimeDecision } from "./FiscalCanaryRuntimeTypes";
import { FiscalCanaryFeatureFlagRegistry } from "./FiscalCanaryFeatureFlagRegistry";
import { FiscalCanaryKillSwitch } from "./FiscalCanaryKillSwitch";

export class FiscalCanaryRuntimeGuard {
  private registry = new FiscalCanaryFeatureFlagRegistry();
  private killSwitch = new FiscalCanaryKillSwitch();

  public evaluate(route: string, operation: string, companyId?: string): FiscalCanaryRuntimeDecision {
    const flags = this.registry.getSnapshot();
    const ks = this.killSwitch.getStatus();

    const blockers = [];
    if (ks.active) {
      blockers.push(ks.reason);
    }
    if (!flags.globalCanaryEnabled) {
      blockers.push("Canary desabilitado globalmente no Registry.");
    }
    blockers.push("Apenas modo HARD_OFF suportado na sprint atual.");

    return {
      routeToV2: false,
      routeToLegacy: true,
      canaryActive: false,
      activationBlocked: true,
      simulationOnly: true,
      reason: "Runtime avaliado como HARD_OFF.",
      blockers,
      warnings: ["Decisão simulada. Nenhuma chave do mundo real altera isso ainda."],
      evaluatedAt: new Date().toISOString()
    };
  }

  public assertHardOff(): boolean {
    const dec = this.evaluate("dummy", "dummy", undefined);
    return dec.routeToV2 === false && dec.routeToLegacy === true && dec.canaryActive === false;
  }
}

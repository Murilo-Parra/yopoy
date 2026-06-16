import { FiscalShadowTapConfig } from "./FiscalShadowTapConfig";
import { FiscalShadowTapDecision } from "./FiscalShadowTapTypes";

export class FiscalShadowTapPolicy {
  public evaluate(route: string, operation: string): FiscalShadowTapDecision {
    const blockers: string[] = [];
    const warnings: string[] = [];

    // Hard-off phase 5.1 enforcement
    blockers.push("Shadow Tap hard-off na Fase 5.1. Nenhuma captura real permitida.");

    if (FiscalShadowTapConfig.getBlockedRoutes().some(r => route.includes(r))) {
      blockers.push(`Rota bloqueada por design inception: ${route}`);
    }

    if (FiscalShadowTapConfig.getBlockedOperations().includes(operation)) {
      blockers.push(`Operação bloqueada por design inception: ${operation}`);
    }

    return {
      captureEnabled: false,
      captureRequest: false,
      captureResponse: false,
      routeToV2: false,
      routeToLegacy: true,
      legacyResponseOfficial: true,
      v2ResponseOfficial: false,
      simulationOnly: true,
      activationBlocked: true,
      reason: blockers.length > 0 ? "Blocked by Policy" : "Hard-off default",
      blockers,
      warnings
    };
  }
}

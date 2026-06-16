import { FiscalCanaryRouteMappingRegistry } from "../routes/FiscalCanaryRouteMappingRegistry";
import { FiscalCanaryRuntimeGuard } from "../runtime/FiscalCanaryRuntimeGuard";
import { FiscalCanaryRouteRiskLevel } from "../routes/FiscalCanaryRouteMapTypes";
import { FiscalShadowProxyDispatchInput, FiscalShadowProxyDispatchResult } from "./FiscalShadowProxyTypes";

export class FiscalShadowProxyDecisionService {
  private mappingRegistry = new FiscalCanaryRouteMappingRegistry();
  private runtimeGuard = new FiscalCanaryRuntimeGuard();

  public evaluateDecision(input: FiscalShadowProxyDispatchInput): FiscalShadowProxyDispatchResult {
    const blockers: string[] = [];
    const warnings: string[] = ["Shadow Proxy opera apenas em modo Harness. Nenhum tráfego interceptado."];

    const mapping = this.mappingRegistry.findByLegacyRoute(input.legacyMethod, input.legacyPath);
    if (!mapping) {
      blockers.push("Rota não mapeada no catálogo V2.");
    } else {
      if (mapping.riskLevel === FiscalCanaryRouteRiskLevel.CRITICAL) {
        blockers.push("Proxy de simulação bloqueado para rotas CRITICAL.");
      }
      if (mapping.requiresSefaz || mapping.requiresXmlSignature || mapping.requiresPdfGeneration || mapping.sideEffects) {
        blockers.push("Proxy bloqueado para rotas com dependência de SEFAZ, XML, PDF ou Side Effects.");
      }
    }

    const guardActive = this.runtimeGuard.assertHardOff();
    if (!guardActive) {
      blockers.push("Runtime Guard não está em estado Hard-Off seguro.");
    }

    return {
      dispatched: false,
      legacyOfficial: true,
      v2Official: false,
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true,
      mappingId: mapping?.id,
      warnings,
      blockers
    };
  }
}

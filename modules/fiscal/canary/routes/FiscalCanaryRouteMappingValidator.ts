import { FiscalCanaryRouteMappingValidation, FiscalCanaryRouteMapping, FiscalCanaryRouteRiskLevel } from "./FiscalCanaryRouteMapTypes";
import { FiscalCanaryRuntimeGuard } from "../runtime/FiscalCanaryRuntimeGuard";

export class FiscalCanaryRouteMappingValidator {
  private runtimeGuard = new FiscalCanaryRuntimeGuard();

  public validateMapping(mapping: FiscalCanaryRouteMapping): FiscalCanaryRouteMappingValidation {
    const isHardOff = this.runtimeGuard.assertHardOff();
    const blockers: string[] = [];

    if (!isHardOff) {
      blockers.push("Runtime Guard não está em estado Hard-Off seguro.");
    }
    
    if (mapping.riskLevel === FiscalCanaryRouteRiskLevel.CRITICAL) {
      blockers.push("Rotas críticas bloqueadas por policy.");
    }

    if (mapping.requiresSefaz) {
      blockers.push("Rotas com requisito SEFAZ real bloqueadas.");
    }

    if (mapping.requiresXmlSignature) {
      blockers.push("Rotas com requisito de Assinatura XML real bloqueadas.");
    }

    if (mapping.requiresPdfGeneration) {
      blockers.push("Rotas com requisito de geração de PDF real bloqueadas.");
    }

    if (mapping.sideEffects) {
      blockers.push("Efeitos colaterais bloqueados.");
    }

    return {
      valid: blockers.length === 0,
      mappingId: mapping.id,
      blockers,
      warnings: ["Qualquer validação aqui deve manter simulationOnly=true e activationBlocked=true."],
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }

  public validateNonMappedRoute(): FiscalCanaryRouteMappingValidation {
    return {
      valid: false,
      blockers: ["Rota não mapeada no catálogo V2."],
      warnings: [],
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}

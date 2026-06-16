import { FiscalCanaryEvidenceService } from "../FiscalCanaryEvidenceService";
import { FiscalCanaryRouteMappingRegistry } from "./FiscalCanaryRouteMappingRegistry";
import { FiscalCanaryRouteMappingStatus } from "./FiscalCanaryRouteMapTypes";

export class FiscalCanaryRouteReadinessService {
  private evidenceService = new FiscalCanaryEvidenceService();
  private registry = new FiscalCanaryRouteMappingRegistry();

  public async getReadinessForMapping(mappingId: string, companyId?: string): Promise<any> {
    const mapping = this.registry.getMappingById(mappingId);
    if (!mapping) {
      return this.buildNotReady("Mapeamento inexistente.");
    }

    if (mapping.status === FiscalCanaryRouteMappingStatus.BLOCKED || !mapping.canaryEligibleFuture) {
      return this.buildNotReady("Rota catalogada como inelegível ou bloqueada.");
    }

    const evidence = await this.evidenceService.evaluateEvidence(mapping.legacyPath, mapping.operation, companyId);
    
    if (evidence.evidenceStatus === "BLOCKED") {
       return this.buildNotReady("Shadow audit indica bloqueadores na rota.", ["Evidência: BLOCKER"]);
    }

    if (evidence.evidenceStatus === "INSUFFICIENT" || evidence.evidenceStatus === "UNKNOWN") {
       return this.buildNotReady("Shadow audit com baixa amostragem.", ["Evidência: INSUFFICIENT_EVIDENCE"]);
    }

    return {
      readyForFutureReview: true,
      notReadyReason: null,
      blockers: [],
      warnings: ["Tudo certo para o futuro, mas a V2 segue bloqueada nesta Sprint."],
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }

  private buildNotReady(reason: string, blockers: string[] = []): any {
    return {
      readyForFutureReview: false,
      notReadyReason: reason,
      blockers,
      warnings: [],
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}

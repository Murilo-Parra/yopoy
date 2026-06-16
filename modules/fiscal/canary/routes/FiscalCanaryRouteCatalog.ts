import { 
  FiscalCanaryRouteMapping, 
  FiscalCanaryRouteRiskLevel, 
  FiscalCanaryRouteMappingStatus,
  FiscalCanaryFiscalOperation
} from "./FiscalCanaryRouteMapTypes";

export class FiscalCanaryRouteCatalog {
  public getCatalog(): FiscalCanaryRouteMapping[] {
    return [
      {
        id: "RMAP_001",
        legacyMethod: "GET",
        legacyPath: "/api/fiscal/documents",
        v2Method: "GET",
        v2Path: "/api/fiscal-v2/documents",
        operation: FiscalCanaryFiscalOperation.FISCAL_DOCUMENT_LIST,
        riskLevel: FiscalCanaryRouteRiskLevel.LOW,
        status: FiscalCanaryRouteMappingStatus.CANDIDATE_FUTURE,
        sideEffects: false,
        requiresSefaz: false,
        requiresXmlSignature: false,
        requiresPdfGeneration: false,
        canaryEligibleFuture: true,
        reason: "Leitura pura. Candidato ideal para canary futuro.",
        simulationOnly: true,
        activationBlocked: true
      },
      {
        id: "RMAP_002",
        legacyMethod: "POST",
        legacyPath: "/api/nfe/transmit",
        v2Method: "POST",
        v2Path: "NONE",
        operation: FiscalCanaryFiscalOperation.NFE_TRANSMIT,
        riskLevel: FiscalCanaryRouteRiskLevel.CRITICAL,
        status: FiscalCanaryRouteMappingStatus.BLOCKED,
        sideEffects: true,
        requiresSefaz: true,
        requiresXmlSignature: true,
        requiresPdfGeneration: true,
        canaryEligibleFuture: false,
        reason: "Transmissão SEFAZ e Assinatura XML bloqueadas.",
        simulationOnly: true,
        activationBlocked: true
      },
      {
        id: "RMAP_003",
        legacyMethod: "GET",
        legacyPath: "/api/fiscal/danfe",
        v2Method: "GET",
        v2Path: "/api/fiscal-v2/danfe",
        operation: FiscalCanaryFiscalOperation.DANFE_LIST,
        riskLevel: FiscalCanaryRouteRiskLevel.LOW,
        status: FiscalCanaryRouteMappingStatus.CANDIDATE_FUTURE,
        sideEffects: false,
        requiresSefaz: false,
        requiresXmlSignature: false,
        requiresPdfGeneration: false,
        canaryEligibleFuture: true,
        reason: "Recuperação de PDF já gerado. Baixo risco.",
        simulationOnly: true,
        activationBlocked: true
      },
      {
        id: "RMAP_004",
        legacyMethod: "POST",
        legacyPath: "/api/fiscal/documents",
        v2Method: "POST",
        v2Path: "/api/fiscal-v2/sandbox/documents",
        operation: FiscalCanaryFiscalOperation.FISCAL_DOCUMENT_CREATE,
        riskLevel: FiscalCanaryRouteRiskLevel.MEDIUM,
        status: FiscalCanaryRouteMappingStatus.MAPPED_INERT,
        sideEffects: false,
        requiresSefaz: false,
        requiresXmlSignature: false,
        requiresPdfGeneration: false,
        canaryEligibleFuture: false, // Pode ser no sandbox/dry-run, mas n eh producao real
        reason: "Escrita de rascunhos. Mapeado para sandbox futuro.",
        simulationOnly: true,
        activationBlocked: true
      }
    ];
  }
}

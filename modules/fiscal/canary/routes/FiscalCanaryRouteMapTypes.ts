export enum FiscalCanaryRouteRiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum FiscalCanaryRouteMappingStatus {
  UNMAPPED = "UNMAPPED",
  MAPPED_INERT = "MAPPED_INERT",
  CANDIDATE_FUTURE = "CANDIDATE_FUTURE",
  BLOCKED = "BLOCKED",
  NOT_SUPPORTED = "NOT_SUPPORTED"
}

export enum FiscalCanaryFiscalOperation {
  FISCAL_DOCUMENT_LIST = "FISCAL_DOCUMENT_LIST",
  FISCAL_DOCUMENT_CREATE = "FISCAL_DOCUMENT_CREATE",
  NFE_LIST = "NFE_LIST",
  NFE_CREATE = "NFE_CREATE",
  NFE_TRANSMIT = "NFE_TRANSMIT",
  NFE_CANCEL = "NFE_CANCEL",
  NFCE_LIST = "NFCE_LIST",
  NFCE_CREATE = "NFCE_CREATE",
  NFCE_TRANSMIT = "NFCE_TRANSMIT",
  NFCE_CANCEL = "NFCE_CANCEL",
  DANFE_LIST = "DANFE_LIST",
  DANFE_GENERATE = "DANFE_GENERATE",
  SEFAZ_PROTOCOL_LIST = "SEFAZ_PROTOCOL_LIST",
  SEFAZ_TRANSMIT = "SEFAZ_TRANSMIT",
  NFSE_LIST = "NFSE_LIST",
  NFSE_CREATE = "NFSE_CREATE",
  NFSE_TRANSMIT = "NFSE_TRANSMIT"
}

export interface FiscalCanaryRouteMapping {
  id: string;
  legacyMethod: string;
  legacyPath: string;
  v2Method: string;
  v2Path: string;
  operation: string;
  riskLevel: FiscalCanaryRouteRiskLevel;
  status: FiscalCanaryRouteMappingStatus;
  sideEffects: boolean;
  requiresSefaz: boolean;
  requiresXmlSignature: boolean;
  requiresPdfGeneration: boolean;
  canaryEligibleFuture: boolean;
  reason: string;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalCanaryRouteMappingValidation {
  valid: boolean;
  mappingId?: string;
  blockers: string[];
  warnings: string[];
  routeToV2: boolean;
  routeToLegacy: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

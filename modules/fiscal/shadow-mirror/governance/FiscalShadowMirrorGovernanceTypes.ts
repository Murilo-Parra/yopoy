export enum FiscalShadowMirrorGovernanceStatus {
  CLOSED_AS_DESIGN_ONLY = 'CLOSED_AS_DESIGN_ONLY',
  CLOSED_WITH_WARNINGS = 'CLOSED_WITH_WARNINGS',
  BLOCKED_FOR_REAL_CAPTURE = 'BLOCKED_FOR_REAL_CAPTURE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalShadowMirrorGovernanceDomain {
  ROUTE_REGISTRY = 'ROUTE_REGISTRY',
  MANUAL_SIMULATION = 'MANUAL_SIMULATION',
  CAPTURE_DRY_RUN = 'CAPTURE_DRY_RUN',
  PASSIVE_TAP_DESIGN = 'PASSIVE_TAP_DESIGN',
  SAFE_MIDDLEWARE_DESIGN = 'SAFE_MIDDLEWARE_DESIGN',
  TELEMETRY_PIPELINE_DESIGN = 'TELEMETRY_PIPELINE_DESIGN',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  XML_PDF_ISOLATION = 'XML_PDF_ISOLATION',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalShadowMirrorGovernanceInventoryItem {
  domain: FiscalShadowMirrorGovernanceDomain | string;
  implemented: boolean;
  hasRoutes: boolean;
  hasRuntimeSideEffects: false;
  readOnly: boolean;
  designOnly: boolean;
  planningOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  middlewareInstalled: false;
  tapInstalled: false;
  capturesRequest: false;
  capturesResponse: false;
  routeToV2: false;
  routeToLegacy: true;
  hasWorker: false;
  hasCron: false;
  hasSefaz: false;
  hasXmlSigning: false;
  hasPdfGeneration: false;
  notes: string;
}

export interface FiscalShadowMirrorGovernanceGuardrail {
  id: string;
  name: string;
  passed: boolean;
  severity: string;
  evidence: string;
  blockerForRealActivation: boolean;
}

export interface FiscalShadowMirrorGovernanceRisk {
  id: string;
  severity: string;
  description: string;
  mitigation: string;
  blockerForRealActivation: boolean;
}

export interface FiscalShadowMirrorGovernanceHandoff {
  generatedAt: string;
  currentModule: string;
  nextRecommendedDomain: string;
  allowedNextActions: string[];
  forbiddenNextActions: string[];
  blockersBeforeRealCapture: string[];
  blockersBeforeRealCanary: string[];
  readOnly: true;
  designOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCapture: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalShadowMirrorGovernanceFinalReport {
  generatedAt: string;
  status: FiscalShadowMirrorGovernanceStatus | string;
  inventory: FiscalShadowMirrorGovernanceInventoryItem[];
  guardrails: FiscalShadowMirrorGovernanceGuardrail[];
  risks: FiscalShadowMirrorGovernanceRisk[];
  handoff: FiscalShadowMirrorGovernanceHandoff;
  recommendations: string[];
  readOnly: true;
  designOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCapture: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
